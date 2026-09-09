# @diphyx/icons

> A curated collection of optimized SVG icons for DiPhyx projects, fully compatible with Iconify

[![npm version](https://img.shields.io/npm/v/@diphyx/icons.svg)](https://www.npmjs.com/package/@diphyx/icons)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🎨 **35+ carefully optimized SVG icons**
- 📦 **Iconify JSON format** - Works seamlessly with Iconify ecosystem
- 🚀 **Multiple usage methods** - npm, GitHub CDN, or direct import
- ⚡ **Zero dependencies** - Optimized and minified SVG files
- 🛠️ **TypeScript build scripts** - Automated optimization pipeline

---

## 📦 Installation

### Via Package Manager

```bash
# npm
npm install @diphyx/icons

# pnpm
pnpm add @diphyx/icons

# yarn
yarn add @diphyx/icons
```

### Via GitHub (No Installation)

Use icons directly from GitHub without installation!

```html
<img
    src="https://raw.githubusercontent.com/diphyx/icons/main/icons/nodejs.svg"
    alt="Node.js"
/>
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

Browse the [`assets/`](./assets) directory to see all available icons. Each icon name corresponds to its filename without the `.svg` extension.

**Icon Naming Convention:**

- Source: `assets/nodejs.svg`
- Iconify: `diphyx:nodejs`
- Direct: `icons/nodejs.svg`

### Icon Categories

- **Languages:** nodejs, python, php, go, js
- **Development:** vscode, coder, jupyter, nginx
- **Browsers:** chromium, firefox, vivaldi
- **Linux:** debian, fedora, ubuntu, void
- **Scientific:** gromacs, pymol, paraview, rstudio
- **Communication:** telegram, signal
- **And many more!**

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

Source files in `assets/` keep their original dimensions — normalization happens at build time only, so every icon in `icons/` and `icons.json` is a consistent 24×24.

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
├── assets/           # 📂 Source SVG files (unoptimized)
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

1. Add your SVG file to `assets/` directory (any viewBox — the build normalizes it to 24×24)
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
