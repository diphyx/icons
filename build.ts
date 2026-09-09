import { join } from "path";
import { writeFile, mkdir, readdir } from "fs/promises";
import { SVG } from "@iconify/tools/lib/svg";
import { importDirectory } from "@iconify/tools/lib/import/directory";
import { cleanupSVG } from "@iconify/tools/lib/svg/cleanup";
import { runSVGO } from "@iconify/tools/lib/optimise/svgo";
import { createConsola } from "consola";

const consola = createConsola({
    formatOptions: {
        date: false,
    },
});

type ProcessResult = {
    name: string;
    message: string;
};

type IconifyIcon = {
    body: string;
    width?: number;
    height?: number;
    left?: number;
    top?: number;
};

type IconifyJSON = {
    prefix: string;
    icons: Record<string, IconifyIcon>;
    width?: number;
    height?: number;
    info?: {
        name: string;
        author: {
            name: string;
            url?: string;
        };
        license: {
            title: string;
            url?: string;
        };
    };
};

const SRC_DIR = "assets";
const DIST_DIR = "icons";
const ICON_PREFIX = "diphyx";
const ICON_SIZE = 24;

/**
 * SVG presentation attributes: CSS properties that are also valid as plain
 * attributes, so a <style> rule can be rewritten without losing meaning.
 */
const PRESENTATION_ATTRIBUTES = new Set([
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "cursor",
    "direction",
    "display",
    "dominant-baseline",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flood-color",
    "flood-opacity",
    "font-family",
    "font-size",
    "font-stretch",
    "font-style",
    "font-variant",
    "font-weight",
    "image-rendering",
    "letter-spacing",
    "lighting-color",
    "marker-end",
    "marker-mid",
    "marker-start",
    "mask",
    "opacity",
    "overflow",
    "paint-order",
    "pointer-events",
    "shape-rendering",
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "text-anchor",
    "text-decoration",
    "text-rendering",
    "transform",
    "transform-origin",
    "vector-effect",
    "visibility",
    "word-spacing",
    "writing-mode",
]);

/**
 * Parse a CSS declaration list into property/value pairs.
 */
function parseDeclarations(text: string): Record<string, string> {
    return text.split(";").reduce((accumulator, declaration) => {
        const separator = declaration.indexOf(":");
        if (separator === -1) {
            return accumulator;
        }

        const property = declaration.slice(0, separator).trim();
        const value = declaration.slice(separator + 1).trim();
        if (property && value) {
            accumulator[property] = value;
        }

        return accumulator;
    }, {} as Record<string, string>);
}

/**
 * Rewrite <style> rules and style="" attributes as presentation attributes,
 * then strip every class and <style> element.
 *
 * A <style> element inside an inline SVG is not scoped to that SVG: it applies
 * to the whole document. Icons rendered inline therefore collide on shared
 * class names like .cls-1 and repaint each other. Presentation attributes carry
 * the same styling as plain SVG, with no document-wide side effects.
 */
function flattenStyles(svg: SVG, name: string): void {
    const $ = svg.$svg;
    const rules = new Map<string, Record<string, string>>();

    // Collect declarations per class name, in CSS source order
    $("style").each((_, element) => {
        const css = $(element).text();
        const pattern = /([^{}]+)\{([^{}]*)\}/g;

        for (const [, selectors, body] of css.matchAll(pattern)) {
            const declarations = parseDeclarations(body);

            for (const selector of selectors.split(",")) {
                const match = selector.trim().match(/^\.([\w-]+)$/);
                if (!match) {
                    throw new Error(`Unsupported CSS selector "${selector.trim()}"`);
                }

                rules.set(match[1], {
                    ...rules.get(match[1]),
                    ...declarations,
                });
            }
        }
    });

    $("style").remove();

    // Apply the declarations as attributes, class rules first, then style=""
    $("[class], [style]").each((_, element) => {
        const $element = $(element);
        const classes = ($element.attr("class") || "").split(/\s+/).filter(Boolean);
        const declarations = classes.reduce(
            (accumulator, className) => ({
                ...accumulator,
                ...rules.get(className),
            }),
            {} as Record<string, string>
        );

        Object.assign(declarations, parseDeclarations($element.attr("style") || ""));

        for (const [property, value] of Object.entries(declarations)) {
            if (!PRESENTATION_ATTRIBUTES.has(property)) {
                consola.warn(`${name}.svg: dropped "${property}", not a presentation attribute`);

                continue;
            }

            $element.attr(property, value);
        }

        $element.removeAttr("class");
        $element.removeAttr("style");
    });
}

/**
 * Scale and center an icon into a square ICON_SIZE viewBox.
 * Aspect ratio is preserved, so non-square source artwork is letterboxed
 * rather than distorted. Source files in assets/ are never modified.
 */
function normalizeSize(svg: SVG): void {
    const { left, top, width, height } = svg.viewBox;

    if (left === 0 && top === 0 && width === ICON_SIZE && height === ICON_SIZE) {
        return;
    }

    const round = (value: number): number => Math.round(value * 10000) / 10000;
    const scale = ICON_SIZE / Math.max(width, height);
    const x = round((ICON_SIZE - width * scale) / 2 - left * scale);
    const y = round((ICON_SIZE - height * scale) / 2 - top * scale);
    const transform = `translate(${x} ${y}) scale(${round(scale)})`;

    svg.load(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 ${ICON_SIZE} ${ICON_SIZE}"><g transform="${transform}">${svg.getBody()}</g></svg>`
    );
}

async function build(): Promise<ProcessResult[]> {
    const errors: ProcessResult[] = [];
    const iconifyJSON: IconifyJSON = {
        prefix: ICON_PREFIX,
        icons: {},
        width: 24,
        height: 24,
        info: {
            name: "DiPhyx Icons",
            author: {
                name: "DiPhyx Team",
                url: "https://github.com/diphyx",
            },
            license: {
                title: "MIT",
                url: "https://opensource.org/licenses/MIT",
            },
        },
    };

    try {
        consola.info(`Creating directory: ${DIST_DIR}`);
        await mkdir(DIST_DIR, {
            recursive: true,
        });

        consola.info(`Importing icons from: ${SRC_DIR}`);

        // Read all SVG files from assets directory
        const allFiles = await readdir(SRC_DIR);
        const svgFiles = allFiles.reduce((accumulator, file) => {
            if (file.endsWith(".svg")) {
                accumulator.push(file.replace(".svg", ""));
            }

            return accumulator;
        }, [] as string[]);

        const icons = await importDirectory(SRC_DIR, {
            ignoreImportErrors: true,
            includeSubDirs: false,
        });

        const iconList = icons.list();
        consola.info(`Total icons found: ${iconList.length}`);

        // Check for files that failed to import
        const failedImports = svgFiles.reduce((accumulator, file) => {
            if (!iconList.includes(file)) {
                accumulator.push(file);
            }

            return accumulator;
        }, [] as string[]);

        if (failedImports.length > 0) {
            failedImports.forEach((filename) => {
                consola.warn(`Failed to import: ${filename}.svg`);
            });
        }

        // Process each icon
        for (const name of iconList) {
            try {
                const svg = icons.toSVG(name);
                if (!svg) {
                    errors.push({
                        name,
                        message: "Failed to convert to SVG",
                    });

                    consola.error(`Processing failed: ${name}.svg - Failed to convert to SVG`);

                    continue;
                }

                cleanupSVG(svg);
                flattenStyles(svg, name);
                runSVGO(svg);
                normalizeSize(svg);

                // Nothing downstream should reintroduce document-wide styling
                const body = svg.getBody();
                const leaked = ["<style", "class=", "style="].find((token) => body.includes(token));
                if (leaked) {
                    errors.push({
                        name,
                        message: `Icon body still contains "${leaked}"`,
                    });

                    consola.error(`Processing failed: ${name}.svg - Icon body still contains "${leaked}"`);

                    continue;
                }

                // Save individual SVG file
                const outputPath = join(DIST_DIR, `${name}.svg`);
                await writeFile(outputPath, svg.toMinifiedString());

                consola.success(`Processed: ${name}.svg`);

                // Add to Iconify JSON
                const viewBox = svg.viewBox;
                const iconData: IconifyIcon = {
                    body,
                };

                // Only include dimensions if different from default
                if (viewBox.width !== 24) {
                    iconData.width = viewBox.width;
                }
                if (viewBox.height !== 24) {
                    iconData.height = viewBox.height;
                }
                if (viewBox.left !== 0) {
                    iconData.left = viewBox.left;
                }
                if (viewBox.top !== 0) {
                    iconData.top = viewBox.top;
                }

                iconifyJSON.icons[name] = iconData;
            } catch ({ message }: any) {
                errors.push({
                    name,
                    message,
                });

                consola.error(`Processing failed: ${name}.svg - ${message}`);
            }
        }

        // Write Iconify JSON file
        const jsonOutputPath = join(DIST_DIR, "icons.json");
        await writeFile(jsonOutputPath, JSON.stringify(iconifyJSON, null, 2));
        consola.success(`Created icons.json with ${Object.keys(iconifyJSON.icons).length} icons`);
    } catch ({ message }: any) {
        consola.error(`Fatal error during build process: ${message}`);
    }

    return errors;
}

async function main(): Promise<void> {
    consola.info("Build process started");

    try {
        const errors = await build();
        if (errors.length > 0) {
            consola.warn(`Build completed with ${errors.length} error(s)`);
            errors.forEach(({ name, message }) => {
                consola.log(`  - ${name}: ${message}`);
            });
        }

        consola.success("Build process completed successfully");
    } catch ({ message }: any) {
        consola.error(`Build process failed: ${message}`);

        process.exit(1);
    }
}

main();
