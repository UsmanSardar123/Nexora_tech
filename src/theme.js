const THEME_STORAGE_KEY = 'nexora-theme'

export function initializeTheme() {
  let savedTheme

  try {
    savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch (error) {
    console.warn('The saved appearance preference could not be read.', error)
  }

  const theme =
    savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  return theme
}

export function saveTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (error) {
    console.warn('The appearance preference could not be saved.', error)
  }
}
