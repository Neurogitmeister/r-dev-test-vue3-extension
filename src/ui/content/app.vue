<script setup lang="ts">
import Serp from "./serp/serp.vue"

const { url, stopUrlObserver } = useUrlObserver()

provide("url", url)
</script>

<template>
  <Serp />
</template>
