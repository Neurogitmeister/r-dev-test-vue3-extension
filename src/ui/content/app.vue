<script setup lang="ts">
import Notifier from "./notifier/notifier.vue"
import Serp from "./serp/serp.vue"

const { url, stopUrlObserver } = useUrlObserver()

provide("url", url)
</script>

<template>
  <Serp />
  <Notifier />
</template>
