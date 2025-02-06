import { UrlObserver } from "@/content-script/urlObserver"

export const useUrlObserver = () => {
  const url = ref<string>(window.location.href)
  const observer = ref<UrlObserver>()

  const stopUrlObserver = () => observer.value?.disconnect()

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

  return { url, stopUrlObserver }
}
