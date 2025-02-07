import { defineManifest } from "@crxjs/vite-plugin"
import ManifestConfig from "./manifest.config"
import packageJson from "./package.json" with { type: "json" }

// @ts-expect-error ManifestConfig provides all required fields
export default defineManifest((env) => ({
  ...ManifestConfig,
  version_name: packageJson.version,
  author: {
    email: "user@example.com",
  },
  offline_enabled: true,
  key: env["CHROME_ADDON_KEY"],
}))
