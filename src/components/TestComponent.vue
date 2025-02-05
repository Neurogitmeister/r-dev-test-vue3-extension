<script setup lang="ts">
import { sendMessage } from "webext-bridge/popup"
import { Todo } from "@/types/bridge"

const testStore = useTestStore()
const { increment, decrement } = testStore
const { count, name } = storeToRefs(testStore)
const todoId = ref("1")
const todo = ref<Todo>()

const getTodo = () => {
  sendMessage("getTodo", { id: todoId.value }, "background").then((res) => {
    todo.value = res
  })
}

onMounted(() => {
  getTodo()
})

watch(
  () => todoId.value,
  () => {
    getTodo()
  },
)
</script>

<template>
  <div>
    <ul>
      <li>This is a simple example showing Vue.js and DaisyUI.</li>
      <li>You can access relevant chrome apis here.</li>
    </ul>

    <div class="text-center">
      <!-- Name Component -->
      <div>
        <div class="text-lg font-semibold mb-4">Name: {{ name }}</div>
        <input
          v-model="name"
          type="text"
          class="input input-primary"
        />
      </div>
      <br />
      <!-- Counter Component -->
      <div class="text-lg font-semibold mb-4">Count: {{ count }}</div>
      <div class="flex gap-2 justify-center">
        <button
          class="btn btn-primary"
          @click="decrement"
        >
          <i-ph-minus />
          Decrement
        </button>
        <button
          class="btn btn-primary"
          @click="increment"
        >
          <i-ph-plus />
          Increment
        </button>
      </div>
      <br />
      <!-- Todo Component -->
      <div>
        <div class="text-lg font-semibold mb-4">ToDo Id:</div>
        <input
          v-model="todoId"
          type="text"
          class="input input-primary"
        />
      </div>
      <br />
      <div class="text-lg font-semibold mb-4">ToDo Info:</div>
      <div class="flex flex-col gap-1 text-left">
        <span>id: {{ todo?.id }}</span>
        <span>completed: {{ todo?.completed }}</span>
        <span>title: {{ todo?.title }}</span>
        <span>userId: {{ todo?.userId }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
