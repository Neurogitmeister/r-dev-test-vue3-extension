import { useBrowserLocalStorage } from "./useBrowserStorage"

export function useTheme() {
  const { data: colorSchema } = useBrowserLocalStorage("darkMode", "auto")

  const isDark = useDark({
    initialValue: colorSchema,
    onChanged(isDark, defaultHandler, mode) {
      // load initial value
      colorSchema.value = mode
      defaultHandler(mode)
      document.body.setAttribute("data-theme", mode)
    },
  })

  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
