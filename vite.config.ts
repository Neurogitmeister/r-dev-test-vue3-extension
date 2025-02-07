import fs from "node:fs"
import { URL, fileURLToPath } from "node:url"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import { createHtmlPlugin } from "vite-plugin-html"
import { defineConfig } from "vite"
import { dirname, relative, resolve } from "node:path"
import "dotenv/config"

const PORT = Number(process.env.PORT || "") || 3303

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
      "~": fileURLToPath(new URL("src", import.meta.url)),
      src: fileURLToPath(new URL("src", import.meta.url)),
      "@assets": fileURLToPath(new URL("src/assets", import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        // additionalData: `@use "/src/assets/base.scss";`,
        additionalData: (content, filePath) => {
          // do not include base.scss (tailwind etc) in content-script iframe as it will be affect main page styles
          if (filePath.includes("src/pages/content")) {
            return content
          }

          return `@use "/src/assets/base.scss";\n${content}`
        },
      },
    },
  },

  plugins: [
    vue(),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "pinia",
        {
          "webextension-polyfill": [["*", "browser"]],
        },
        {
          notivue: ["Notivue", "Notification", ["push", "pushNotification"]],
        },
      ],
      dts: "src/types/auto-imports.d.ts",
      dirs: ["src/composables/**", "src/stores/**", "src/utils/**"],
      vueTemplate: true,
      viteOptimizeDeps: true,
      eslintrc: {
        enabled: true,
        filepath: "src/types/.eslintrc-auto-import.json",
      },
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ["src/components"],
      // generate `components.d.ts` for ts support with Volar
      dts: "src/types/components.d.ts",
      resolvers: [
        // auto import icons
        IconsResolver(),
      ],
      directoryAsNamespace: true,
      globalNamespaces: ["account", "state"],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: "vue3",
      scale: 1.5,
    }),

    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        const assetsPath = relative(dirname(path), "/assets").replace(
          /\\/g,
          "/",
        )
        return html.replace(/"\/assets\//g, `"${assetsPath}/`)
      },
    },
  ],

  build: {
    manifest: false,
    outDir: "dist",
    sourcemap: false,
    write: true,
  },

  server: {
    port: PORT,
    hmr: {
      host: "localhost",
      clientPort: PORT,
      overlay: true,
      protocol: "ws",
      port: PORT,
    },
    origin: `http://localhost:${PORT}`,
  },

  optimizeDeps: {
    include: ["vue", "@vueuse/core", "webextension-polyfill"],
    exclude: ["vue-demi"],
  },
})
