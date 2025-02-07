<script setup lang="ts">
import { Notivue, Notification } from "notivue"

const url = ref<string>()

onMounted(() => {
  getCurrentTabUrl().then((currUrl) => {
    url.value = currUrl
  })
})

provide(
  "url",
  computed(() => url.value),
)
</script>

<template>
  <div>
    <AppHeader />

    <div class="p-4 prose">
      <RouterView />
    </div>

    <AppFooter />

    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </div>
</template>

<style scoped></style>
