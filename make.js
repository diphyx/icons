import { join } from "path";
import { writeFile } from "fs/promises";
import { importDirectory } from "@iconify/tools/lib/import/directory";
import { cleanupSVG } from "@iconify/tools/lib/svg/cleanup";
import { runSVGO } from "@iconify/tools/lib/optimise/svgo";
import { parseColors, isEmptyColor } from "@iconify/tools/lib/colors/parse";

const icons = await importDirectory("src");

for (const name of icons.list()) {
    const svg = icons.toSVG(name);
    if (!svg) {
        continue;
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

        await writeFile(join("dist", `${name}.svg`), svg.toMinifiedString());
    } catch ({ message }) {
        console.error(`Error parsing ${name}:`, message);
    }
}
