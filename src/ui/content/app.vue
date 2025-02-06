<script setup lang="ts">
const { url, stopUrlObserver } = useUrlObserver()

provide("url", url)
</script>

<template>Hello from content script</template>
