import { writeFile } from "fs/promises";
import { importDirectory } from "@iconify/tools/lib/import/directory";
import { cleanupSVG } from "@iconify/tools/lib/svg/cleanup";
import { runSVGO } from "@iconify/tools/lib/optimise/svgo";
import { parseColors, isEmptyColor } from "@iconify/tools/lib/colors/parse";

async function save(icons) {
    const content = JSON.stringify(icons.export(), null, 4);

    await writeFile(`output/${icons.prefix}.json`, content, "utf8");
}

async function make() {
    const icons = await importDirectory("svg", {
        prefix: "dx",
    });

    icons.forEach((name, type) => {
        if (type !== "icon") {
            return;
        }

        const svg = icons.toSVG(name);
        if (!svg) {
            icons.remove(name);

            return;
        }

        try {
            cleanupSVG(svg);
            parseColors(svg, {
                defaultColor: "currentColor",
                callback: (_, colorStr, color) => {
                    return !color || isEmptyColor(color) ? colorStr : "currentColor";
                },
            });

            runSVGO(svg);
        } catch ({ message }) {
            console.error(`Error parsing ${name}:`, message);

            icons.remove(name);

            return;
        }

        icons.fromSVG(name, svg);
    });

    await save(icons);
}

make();
