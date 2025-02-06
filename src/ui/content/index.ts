import { i18n } from "@/utils/i18n"
import { notivue } from "@/utils/notifications"
import { pinia } from "@/utils/pinia"
import { createApp } from "vue"
import App from "./app.vue"

const app = createApp(App).use(i18n).use(notivue).use(pinia)

const mountDiv = document.createElement("div")
mountDiv.id = "r-dev-root"
const rootEl = document.querySelector("html")
rootEl?.appendChild(mountDiv)

app.mount(mountDiv)

export default app
