import { env } from "node:process"
import type { ManifestV3Export } from "@crxjs/vite-plugin"
import packageJson from "./package.json" with { type: "json" }

const { version, name, description, displayName } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/)

export default {
  author: {
    email: "",
  },
  name: env.mode === "staging" ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: '',
  action: {
    default_popup: "src/pages/popup/index.html",
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      all_frames: false,
      js: ["src/pages/content/index.ts"],
      matches: ["*://*/*"],
      run_at: "document_end",
    },
  ],
  offline_enabled: true,
  host_permissions: [],
  permissions: ["storage", "tabs", "background", "alarms"],
  web_accessible_resources: [
    {
      resources: ["src/assets/*.**"],
      matches: ["<all_urls>"],
    },
  ],
  icons: {
    16: "src/assets/logo.png",
    24: "src/assets/logo.png",
    32: "src/assets/logo.png",
    128: "src/assets/logo.png",
  },
} as ManifestV3Export
