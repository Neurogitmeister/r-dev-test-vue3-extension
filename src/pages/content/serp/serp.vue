<script setup lang="ts">
import { ISerpConfig, serpConfigs } from "./config"

const img = chrome.runtime.getURL("/src/assets/logo.png")

const getSerpConfig = (configs: ISerpConfig[], href: string) =>
  configs.find((config) => new RegExp(config.rx).test(href))

const getMount = (linkNode: Element, config: ISerpConfig) => {
  const element = linkNode.querySelector("br")
  if (element != null) element.remove()

  const mount: Element = document.createElement("span")

  const { root, position } = config
  if (root) {
    linkNode = linkNode.querySelector(root)!
    if (!linkNode) return
  }

  switch (position) {
    case "before": {
      linkNode.before(mount)
      break
    }
    case "after": {
      linkNode.after(mount)
      break
    }
    default: {
      linkNode.prepend(mount)
    }
  }

  return mount
}

interface SerpItemProps {
  merchant: Merchant
  configName: string
}

interface SERPInjection {
  href: string
  el: Element
  merchant: Merchant
  style?: string
}

function getInjections(config: ISerpConfig) {
  const items = document.querySelectorAll(config.selector)
  items.forEach((item) => {
    const isProcessed = item.getAttribute("serp-processed") == "1"
    let href =
      (config.attr && item.getAttribute(config.attr)) ||
      item.getAttribute("href")

    if (!isProcessed && href && href.indexOf("http") == 0) {
      item.setAttribute("serp-processed", "1")

      if (href && href.indexOf("url=http") > 0) {
        const match = href.match(/url=([^&]+)/)
        if (match) {
          href = escape(match[1])
        }
      }

      if (config.hrefrx) {
        let match = unescape(href).match(config.hrefrx)
        if (match && match.length == 2) {
          href = match[1]
        }
      }
      const merchant = getMerchantByUrl(href)

      if (merchant && !isMerchantSerpDisabled(merchant)) {
        const el = getMount(item, config)
        if (el) {
          const injection = { href, merchant, el, style: config.style }
          injections.value?.push(injection)
        }
      }
    }
  })
}

const url = inject<ComputedRef<string>>("url")
const injections = ref<SERPInjection[]>([])
const observer = ref<MutationObserver>()
const merchantsStore = useMerchantsStore()
const { getMerchantByUrl, isMerchantSerpDisabled } = merchantsStore
const { merchants } = storeToRefs(merchantsStore)

const serpConfig = computed(
  () => url?.value && getSerpConfig(serpConfigs, url.value),
)

const search = () => {
  if (!serpConfig.value || !merchants.value.length) return
  getInjections(serpConfig.value)
}

watch(() => [serpConfig.value, merchants.value], search)

onMounted(() => {
  observer.value = new MutationObserver(search)
  observer.value.observe(document, { subtree: true, childList: true })
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

<template>
  <teleport
    v-for="injection of injections"
    :key="injection.href"
    :to="injection.el"
  >
    <div
      class="serp-injection"
      :style="injection.style"
    >
      <img :src="img" />
      {{ injection.merchant.text }}
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.serp-injection {
  display: flex;
  align-items: center;
  img {
    height: 16px;
    width: 16px;
    margin-right: 8px;
  }
}
</style>
