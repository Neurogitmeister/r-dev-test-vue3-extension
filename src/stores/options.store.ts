export const useOptionsStore = defineStore("options", () => {
  const { isDark, toggleDark } = useTheme()

  return {
    isDark,
    toggleDark,
  }
})
