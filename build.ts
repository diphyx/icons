import { join } from "path";
import { writeFile, mkdir, readdir } from "fs/promises";
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
                runSVGO(svg);

                // Save individual SVG file
                const outputPath = join(DIST_DIR, `${name}.svg`);
                await writeFile(outputPath, svg.toMinifiedString());

                consola.success(`Processed: ${name}.svg`);

                // Add to Iconify JSON
                const viewBox = svg.viewBox;
                const iconData: IconifyIcon = {
                    body: svg.getBody(),
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
