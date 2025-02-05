<script setup lang="ts">
const optionsStore = useOptionsStore()
// const { toggleDark } = optionsStore
const { isDark } = storeToRefs(optionsStore)
</script>

<template>
  <div
    class="max-w-xl w-full mx-auto rounded-xl md:my-12 p-4 md:p-8 md:border border-base-200 md:shadow-lg bg-base-100"
  >
    <RouterLinkUp />

    <h1>Options</h1>

    <h3>User Interface</h3>
    <p>Change application interface settings.</p>

    <div class="form-control">
      <label>Enable Dark Theme</label>
      <input
        v-model="isDark"
        type="checkbox"
        class="toggle"
      />
    </div>

    <div class="form-control">
      <label>Change Language</label>
      <LocaleSwitch />
    </div>
  </div>
</template>
