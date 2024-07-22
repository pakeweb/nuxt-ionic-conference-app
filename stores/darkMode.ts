export function useDarkMode() {
  const isDark = useDark({
    valueDark: 'ion-palette-dark',
    valueLight: 'ion-palette-light',
  })

  const toggleDarkMode = useToggle(isDark)

  return {
    isDark,
    toggleDarkMode,
  }
}
