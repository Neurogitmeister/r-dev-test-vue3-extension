<script setup lang="ts"></script>

<template>
  <div class="notifier">Hello from notifier!</div>
</template>

<style scoped lang="scss">
.notifier {
  position: fixed;
  top: 60px;
  right: 60px;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  background: white;
  color: black;
  padding: 20px;
}
</style>
