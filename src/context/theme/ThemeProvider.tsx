import { useEffect, useState, type PropsWithChildren } from 'react'
import { ThemeContext, type Theme } from './ThemeContext'

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    const localStorageTheme = localStorage.getItem('theme') as Theme | null

    if (localStorageTheme) return localStorageTheme

    const systemThemePreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    return systemThemePreference
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
