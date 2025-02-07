<script setup lang="ts">
import { UrlObserver } from "@/utils/urlObserver"
import Notifier from "./notifier/notifier.vue"
import Serp from "./serp/serp.vue"

const url = ref<string>(window.location.href)
const observer = ref<UrlObserver>()

onMounted(() => {
  observer.value = new UrlObserver((newUrl) => {
    url.value = newUrl || ""
  })
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})

provide("url", url)
</script>

<template>
  <Serp />
  <Notifier />
</template>
