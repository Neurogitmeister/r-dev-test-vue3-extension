# vite-vue3-browser-extension-v3

A [Vite](https://vitejs.dev/) powered WebExtension ([Chrome](https://developer.chrome.com/docs/extensions/reference/), [FireFox](https://addons.mozilla.org/en-US/developers/), etc.) starter template based on `manifest 3`, `vue3` and `vite`.

## Development tools

### Vite Plugins

- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use `browser` and Vue Composition API without importing
- [`unplugin-vue-components`](https://github.com/antfu/vite-plugin-components) - components auto import
- [`unplugin-icons`](https://github.com/antfu/unplugin-icons) - icons as components

### Vue Plugins

- [Pinia](https://pinia.vuejs.org/) - Intuitive, type safe, light and flexible Store for Vue

### UI Frameworks

- [tailwindcss](https://tailwindcss.com) - A utility-first CSS framework
- [daisyUI](https://daisyui.com/) - The most popular component library for Tailwind CSS

_Tailwind css `forms` and `typography` plugins are enabled for default styling of form controls._

### WebExtension Libraries

- [`webext-bridge`](https://github.com/zikaari/webext-bridge) - effortlessly communication between contexts
- [`webextension-polyfill`](https://github.com/mozilla/webextension-polyfill) - A lightweight polyfill library for Promise-based WebExtension APIs in Chrome

### Coding Style

- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale
- [ESLint](https://eslint.org/) - Linting utility for JavaScript and JSX
- [Prettier](https://prettier.io/) - Code formatter
- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- Use Composition API with [`setup` SFC syntax](https://pinia.vuejs.org/cookbook/composables.html#Setup-Stores) in Pinia stores

### Browser Related Configurations

- `manifest.config.ts` - Base extension manifest with common configuration
- `manifest.chrome.config.ts` - Chrome/ chromium based browsers specific manifest
- `manifest.firefox.config.ts` - Firefox spefic manifest
- `vite.config.ts` - Base vite configuration
- `vite.chrome.config.ts` - Chrome/ chromium based browsers specific vite configuration
- `vite.firefox.config.ts` - Firefox specific vite configuration

### Scripts

- `npm dev` - Start development server
- `npm build` - Build extension
- `npm lint` - Lint files

_You can also use npm dev:chrome, npm dev:firefox, npm build:chrome, npm build:firefox, npm lint:fix_

_Then load extension in browser with the `dist/` folder_

**Note**: Pack files under `dist/chrome` or `dist/firefox`, you can upload to appropriate extension store.

<!-- readme: collaborators,contributors -end -->
