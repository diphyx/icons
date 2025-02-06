import { join } from "path";
import { writeFile } from "fs/promises";
import { importDirectory } from "@iconify/tools/lib/import/directory";
import { cleanupSVG } from "@iconify/tools/lib/svg/cleanup";
import { runSVGO } from "@iconify/tools/lib/optimise/svgo";

const icons = await importDirectory("src", {
    ignoreImportErrors: true,
});

for (const name of icons.list()) {
    try {
        const svg = icons.toSVG(name);
        if (!svg) {
            continue;
        }

        cleanupSVG(svg);
        runSVGO(svg);

        await writeFile(join("dist", `${name}.svg`), svg.toMinifiedString());
    } catch ({ message }) {
        console.error(`Error parsing ${name}:`, message);
    }
}
