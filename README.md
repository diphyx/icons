# @diphyx/icons

> A curated collection of optimized SVG icons for DiPhyx projects, fully compatible with Iconify

[![npm version](https://img.shields.io/npm/v/@diphyx/icons.svg)](https://www.npmjs.com/package/@diphyx/icons)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎨 **78 carefully optimized SVG icons**
- 📐 **Uniform 24×24 viewBox** - Every icon scales and aligns identically
- 📦 **Iconify JSON format** - Works seamlessly with Iconify ecosystem
- 🚀 **Multiple usage methods** - npm, GitHub CDN, or direct import
- ⚡ **Zero dependencies** - Optimized and minified SVG files
- 🛠️ **TypeScript build scripts** - Automated optimization pipeline

---

## 📦 Installation

```bash
# npm
npm install @diphyx/icons

# pnpm
pnpm add @diphyx/icons

# yarn
yarn add @diphyx/icons
```

---

## 🚀 Usage

### 1️⃣ With Iconify (Recommended)

Perfect for React, Vue, Svelte, and other frameworks with Iconify support.

```javascript
import iconSet from "@diphyx/icons";
import { Icon, addCollection } from "@iconify/react";

// Register the icon set
addCollection(iconSet);

// Use icons with the "diphyx" prefix
function MyComponent() {
    return (
        <>
            <Icon icon="diphyx:nodejs" />
            <Icon icon="diphyx:python" />
            <Icon icon="diphyx:vscode" />
        </>
    );
}
```

### 2️⃣ Direct SVG Import

Import individual SVG files directly (requires bundler support):

```javascript
import nodejsIcon from "@diphyx/icons/svg/nodejs.svg";
import pythonIcon from "@diphyx/icons/svg/python.svg";
import vscodeIcon from "@diphyx/icons/svg/vscode.svg";
```

### 3️⃣ From GitHub CDN

No installation needed - use icons directly from GitHub:

```html
<!-- Direct image usage -->
<img
    src="https://raw.githubusercontent.com/diphyx/icons/main/icons/nodejs.svg"
    alt="Node.js"
    width="24"
    height="24"
/>

<!-- In CSS -->
.icon { background-image:
url('https://raw.githubusercontent.com/diphyx/icons/main/icons/python.svg'); }
```

### 4️⃣ Iconify JSON Format

Use the compiled JSON directly:

```javascript
import iconsData from "@diphyx/icons/json";

console.log(iconsData.icons); // All icons data
console.log(iconsData.prefix); // "diphyx"
```

### 5️⃣ Nuxt.js Integration

```bash
npm install @iconify/vue @diphyx/icons
```

Create `plugins/iconify.ts`:

```typescript
import { addCollection } from "@iconify/vue";
import diphyxIcons from "@diphyx/icons";

export default defineNuxtPlugin(() => {
    addCollection(diphyxIcons);
});
```

Use in components:

```vue
<template>
    <Icon icon="diphyx:nodejs" width="32" />
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
```

---

## 📚 Available Icons

Every icon is previewed below, grouped by category. Each icon name corresponds to its filename without the `.svg` extension.

**Icon Naming Convention:**

- Source: `assets/nodejs.svg`
- Iconify: `diphyx:nodejs`
- Direct: `icons/nodejs.svg`

### Icon Preview

#### Genomics

| ![blast](https://raw.githubusercontent.com/diphyx/icons/main/icons/blast.svg) | ![bwa](https://raw.githubusercontent.com/diphyx/icons/main/icons/bwa.svg) | ![cutadapt](https://raw.githubusercontent.com/diphyx/icons/main/icons/cutadapt.svg) | ![ensembl-vep](https://raw.githubusercontent.com/diphyx/icons/main/icons/ensembl-vep.svg) | ![fastqc](https://raw.githubusercontent.com/diphyx/icons/main/icons/fastqc.svg) | ![igv](https://raw.githubusercontent.com/diphyx/icons/main/icons/igv.svg) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `blast` | `bwa` | `cutadapt` | `ensembl-vep` | `fastqc` | `igv` |

| ![ivar](https://raw.githubusercontent.com/diphyx/icons/main/icons/ivar.svg) | ![pangolin](https://raw.githubusercontent.com/diphyx/icons/main/icons/pangolin.svg) | ![samtools](https://raw.githubusercontent.com/diphyx/icons/main/icons/samtools.svg) |
| :---: | :---: | :---: |
| `ivar` | `pangolin` | `samtools` |

#### Molecular & Structural

| ![ambermd](https://raw.githubusercontent.com/diphyx/icons/main/icons/ambermd.svg) | ![avogadro](https://raw.githubusercontent.com/diphyx/icons/main/icons/avogadro.svg) | ![cdk](https://raw.githubusercontent.com/diphyx/icons/main/icons/cdk.svg) | ![gromacs](https://raw.githubusercontent.com/diphyx/icons/main/icons/gromacs.svg) | ![pymol](https://raw.githubusercontent.com/diphyx/icons/main/icons/pymol.svg) | ![scipion](https://raw.githubusercontent.com/diphyx/icons/main/icons/scipion.svg) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `ambermd` | `avogadro` | `cdk` | `gromacs` | `pymol` | `scipion` |

#### Simulation

| ![lammps](https://raw.githubusercontent.com/diphyx/icons/main/icons/lammps.svg) | ![odt](https://raw.githubusercontent.com/diphyx/icons/main/icons/odt.svg) | ![openfoam](https://raw.githubusercontent.com/diphyx/icons/main/icons/openfoam.svg) | ![su2](https://raw.githubusercontent.com/diphyx/icons/main/icons/su2.svg) | ![uintah-wasatch](https://raw.githubusercontent.com/diphyx/icons/main/icons/uintah-wasatch.svg) |
| :---: | :---: | :---: | :---: | :---: |
| `lammps` | `odt` | `openfoam` | `su2` | `uintah-wasatch` |

#### Analytics & AI

| ![jupyter](https://raw.githubusercontent.com/diphyx/icons/main/icons/jupyter.svg) | ![knime](https://raw.githubusercontent.com/diphyx/icons/main/icons/knime.svg) | ![labplot](https://raw.githubusercontent.com/diphyx/icons/main/icons/labplot.svg) | ![octave](https://raw.githubusercontent.com/diphyx/icons/main/icons/octave.svg) | ![ollama](https://raw.githubusercontent.com/diphyx/icons/main/icons/ollama.svg) | ![open-webui](https://raw.githubusercontent.com/diphyx/icons/main/icons/open-webui.svg) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `jupyter` | `knime` | `labplot` | `octave` | `ollama` | `open-webui` |

| ![rstudio](https://raw.githubusercontent.com/diphyx/icons/main/icons/rstudio.svg) | ![scilab](https://raw.githubusercontent.com/diphyx/icons/main/icons/scilab.svg) | ![veusz](https://raw.githubusercontent.com/diphyx/icons/main/icons/veusz.svg) |
| :---: | :---: | :---: |
| `rstudio` | `scilab` | `veusz` |

#### Visualization

| ![paraview](https://raw.githubusercontent.com/diphyx/icons/main/icons/paraview.svg) | ![visit](https://raw.githubusercontent.com/diphyx/icons/main/icons/visit.svg) |
| :---: | :---: |
| `paraview` | `visit` |

#### Graphics

| ![blender](https://raw.githubusercontent.com/diphyx/icons/main/icons/blender.svg) | ![darktable](https://raw.githubusercontent.com/diphyx/icons/main/icons/darktable.svg) | ![fontforge](https://raw.githubusercontent.com/diphyx/icons/main/icons/fontforge.svg) | ![gimp](https://raw.githubusercontent.com/diphyx/icons/main/icons/gimp.svg) | ![inkscape](https://raw.githubusercontent.com/diphyx/icons/main/icons/inkscape.svg) | ![krita](https://raw.githubusercontent.com/diphyx/icons/main/icons/krita.svg) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `blender` | `darktable` | `fontforge` | `gimp` | `inkscape` | `krita` |

| ![mypaint](https://raw.githubusercontent.com/diphyx/icons/main/icons/mypaint.svg) |
| :---: |
| `mypaint` |

#### Engineering

| ![freecad](https://raw.githubusercontent.com/diphyx/icons/main/icons/freecad.svg) | ![kicad](https://raw.githubusercontent.com/diphyx/icons/main/icons/kicad.svg) | ![librecad](https://raw.githubusercontent.com/diphyx/icons/main/icons/librecad.svg) |
| :---: | :---: | :---: |
| `freecad` | `kicad` | `librecad` |

#### Geospatial

| ![grass](https://raw.githubusercontent.com/diphyx/icons/main/icons/grass.svg) | ![qgis](https://raw.githubusercontent.com/diphyx/icons/main/icons/qgis.svg) | ![stellarium](https://raw.githubusercontent.com/diphyx/icons/main/icons/stellarium.svg) |
| :---: | :---: | :---: |
| `grass` | `qgis` | `stellarium` |

#### Media

| ![audacity](https://raw.githubusercontent.com/diphyx/icons/main/icons/audacity.svg) | ![kdenlive](https://raw.githubusercontent.com/diphyx/icons/main/icons/kdenlive.svg) | ![shotcut](https://raw.githubusercontent.com/diphyx/icons/main/icons/shotcut.svg) | ![vlc](https://raw.githubusercontent.com/diphyx/icons/main/icons/vlc.svg) |
| :---: | :---: | :---: | :---: |
| `audacity` | `kdenlive` | `shotcut` | `vlc` |

#### Office

| ![libreoffice](https://raw.githubusercontent.com/diphyx/icons/main/icons/libreoffice.svg) | ![lyx](https://raw.githubusercontent.com/diphyx/icons/main/icons/lyx.svg) | ![sigil](https://raw.githubusercontent.com/diphyx/icons/main/icons/sigil.svg) |
| :---: | :---: | :---: |
| `libreoffice` | `lyx` | `sigil` |

#### Development

| ![coder](https://raw.githubusercontent.com/diphyx/icons/main/icons/coder.svg) | ![dbeaver](https://raw.githubusercontent.com/diphyx/icons/main/icons/dbeaver.svg) | ![geany](https://raw.githubusercontent.com/diphyx/icons/main/icons/geany.svg) | ![vscode](https://raw.githubusercontent.com/diphyx/icons/main/icons/vscode.svg) | ![wireshark](https://raw.githubusercontent.com/diphyx/icons/main/icons/wireshark.svg) |
| :---: | :---: | :---: | :---: | :---: |
| `coder` | `dbeaver` | `geany` | `vscode` | `wireshark` |

#### Languages

| ![go](https://raw.githubusercontent.com/diphyx/icons/main/icons/go.svg) | ![js](https://raw.githubusercontent.com/diphyx/icons/main/icons/js.svg) | ![nodejs](https://raw.githubusercontent.com/diphyx/icons/main/icons/nodejs.svg) | ![php](https://raw.githubusercontent.com/diphyx/icons/main/icons/php.svg) | ![python](https://raw.githubusercontent.com/diphyx/icons/main/icons/python.svg) |
| :---: | :---: | :---: | :---: | :---: |
| `go` | `js` | `nodejs` | `php` | `python` |

#### Infrastructure

| ![filegator](https://raw.githubusercontent.com/diphyx/icons/main/icons/filegator.svg) | ![nginx](https://raw.githubusercontent.com/diphyx/icons/main/icons/nginx.svg) | ![s3](https://raw.githubusercontent.com/diphyx/icons/main/icons/s3.svg) | ![slurm](https://raw.githubusercontent.com/diphyx/icons/main/icons/slurm.svg) |
| :---: | :---: | :---: | :---: |
| `filegator` | `nginx` | `s3` | `slurm` |

#### Browsers

| ![chromium](https://raw.githubusercontent.com/diphyx/icons/main/icons/chromium.svg) | ![falkon](https://raw.githubusercontent.com/diphyx/icons/main/icons/falkon.svg) | ![firefox](https://raw.githubusercontent.com/diphyx/icons/main/icons/firefox.svg) | ![vivaldi](https://raw.githubusercontent.com/diphyx/icons/main/icons/vivaldi.svg) |
| :---: | :---: | :---: | :---: |
| `chromium` | `falkon` | `firefox` | `vivaldi` |

#### Linux

| ![debian](https://raw.githubusercontent.com/diphyx/icons/main/icons/debian.svg) | ![fedora](https://raw.githubusercontent.com/diphyx/icons/main/icons/fedora.svg) | ![ubuntu](https://raw.githubusercontent.com/diphyx/icons/main/icons/ubuntu.svg) | ![void](https://raw.githubusercontent.com/diphyx/icons/main/icons/void.svg) |
| :---: | :---: | :---: | :---: |
| `debian` | `fedora` | `ubuntu` | `void` |

#### Communication

| ![element](https://raw.githubusercontent.com/diphyx/icons/main/icons/element.svg) | ![signal](https://raw.githubusercontent.com/diphyx/icons/main/icons/signal.svg) | ![telegram](https://raw.githubusercontent.com/diphyx/icons/main/icons/telegram.svg) | ![thunderbird](https://raw.githubusercontent.com/diphyx/icons/main/icons/thunderbird.svg) |
| :---: | :---: | :---: | :---: |
| `element` | `signal` | `telegram` | `thunderbird` |

#### Utilities

| ![filezilla](https://raw.githubusercontent.com/diphyx/icons/main/icons/filezilla.svg) |
| :---: |
| `filezilla` |
---

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Build Process

Generate optimized SVG files and Iconify JSON:

```bash
pnpm run build
```

This will:

1. Import and optimize all SVG files from `assets/`
2. Normalize every icon to a `0 0 24 24` viewBox (uniform scale, centered, aspect ratio preserved)
3. Generate individual optimized SVG files in `icons/`
4. Create `icons/icons.json` with Iconify format

Source files in `assets/` keep their original dimensions — normalization happens at build time only.

### Type Checking

```bash
pnpm run type-check
```

### Clean Build

```bash
make clean
make build
```

---

## 📁 Project Structure

```
@diphyx/icons/
├── assets/           # 📂 Source SVG files (unoptimized, original dimensions)
├── icons/            # 📦 Built and optimized icons (committed to git)
│   ├── *.svg         # Individual optimized SVG files
│   └── icons.json    # Iconify JSON format
├── build.ts          # 🔧 Build script
├── tsconfig.json     # TypeScript configuration
├── package.json      # Package metadata
└── README.md         # This file
```

---

## 📤 Publishing

The `icons/` directory is **committed to git**, making icons directly usable from GitHub without requiring a build step.

When publishing to npm:

- ✅ Source files (`assets/`) are included
- ✅ Built files (`icons/`) are included
- ✅ Both can be used by consumers

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Adding New Icons

1. Add your SVG file to `assets/` directory (any viewBox)
2. Run `pnpm run build` to optimize
3. Commit both source and built files
4. Submit a PR

---

## 📄 License

MIT © DiPhyx Team

---

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/@diphyx/icons)
- [GitHub Repository](https://github.com/diphyx/icons)
- [Iconify Documentation](https://iconify.design/)

---

Made with ❤️ by the DiPhyx Team
