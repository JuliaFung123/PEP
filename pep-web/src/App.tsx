import './App.css'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ThemeShowcase } from './pages/ThemeShowcase'
import { InputTypePage } from './pages/InputTypePage'
import { FilterPage } from './pages/FilterPage'

type PreviewPage = 'theme' | 'input-type' | 'filter'
type ThemeMode = 'light' | 'dark'
const THEME_STORAGE_KEY = 'pep.theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

function pageFromPath(pathname: string): PreviewPage {
  if (pathname === '/preview/input-type' || pathname === '/preview/input') return 'input-type'
  if (pathname === '/preview/theme') return 'theme'
  if (pathname === '/preview/filter') return 'filter'
  return 'input-type'
}

function pathFromPage(page: PreviewPage): string {
  if (page === 'input-type') return '/preview/input-type'
  if (page === 'theme') return '/preview/theme'
  if (page === 'filter') return '/preview/filter'
  return '/preview/input-type'
}

function App() {
  const [page, setPage] = React.useState<PreviewPage>(() =>
    typeof window !== 'undefined' ? pageFromPath(window.location.pathname) : 'input-type',
  )
  const [theme, setTheme] = React.useState<ThemeMode>(getInitialTheme)

  React.useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  React.useEffect(() => {
    applyTheme(theme)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
  }, [theme])

  const navigate = (next: PreviewPage) => {
    setPage(next)
    const nextPath = pathFromPage(next)
    if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur">
        <div className="mx-auto flex min-h-[var(--app-header-height)] w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3.5">
          <Tabs
            value={page}
            onValueChange={(v) => navigate(v as PreviewPage)}
            className="flex items-center"
          >
            <TabsList>
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="input-type">Input Type</TabsTrigger>
              <TabsTrigger value="filter">Filter</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="ml-auto flex items-center gap-2">
            <Sun className="size-4 text-muted-foreground" aria-hidden />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')}
              aria-label="Light/Dark mode"
            />
            <Moon className="size-4 text-muted-foreground" aria-hidden />
          </div>
        </div>
      </div>

      {page === 'input-type' ? (
        <InputTypePage />
      ) : page === 'filter' ? (
        <FilterPage />
      ) : (
        <ThemeShowcase />
      )}
    </div>
  )
}

export default App
