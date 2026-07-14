import './App.css'

import * as React from 'react'

import { AppPreviewSidebar, type PreviewPage } from '@/components/app-preview-sidebar'
import { PepTopBar } from '@/components/pep-chrome'

import { ThemeShowcase } from './pages/ThemeShowcase'
import { TypographyPage } from './pages/TypographyPage'
import { SiteHeaderPage } from './pages/SiteHeaderPage'
import { ButtonsPage } from './pages/ButtonsPage'
import { BadgesPage } from './pages/BadgesPage'
import { AvatarsPage } from './pages/AvatarsPage'
import { TabsPage } from './pages/TabsPage'
import { PaginationPage } from './pages/PaginationPage'
import { RadioCheckboxPage } from './pages/RadioCheckboxPage'
import { SwitchPage } from './pages/SwitchPage'
import { ProgressPage } from './pages/ProgressPage'
import { ImageFilePage } from './pages/ImageFilePage'
import { HoverActionPage } from './pages/HoverActionPage'
import { SteppersPage } from './pages/SteppersPage'
import { MainMenuPage } from './pages/MainMenuPage'
import { InputTypePage } from './pages/InputTypePage'
import { FilterPage } from './pages/FilterPage'
import { OrdersAdminPage } from './pages/OrdersAdminPage'
import { TaskManagementPage } from './pages/TaskManagementPage'
import { ActivityCreatePage } from './pages/ActivityCreatePage'

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
  if (pathname === '/preview/typography') return 'typography'
  if (pathname === '/preview/site-header' || pathname === '/preview/top-bar' || pathname === '/preview/components') return 'site-header'
  if (pathname === '/preview/buttons') return 'buttons'
  if (pathname === '/preview/badges') return 'badges'
  if (pathname === '/preview/avatars') return 'avatars'
  if (pathname === '/preview/tabs') return 'tabs'
  if (pathname === '/preview/pagination') return 'pagination'
  if (pathname === '/preview/radio-checkbox' || pathname === '/preview/radio' || pathname === '/preview/checkbox') return 'radio-checkbox'
  if (pathname === '/preview/switch') return 'switch'
  if (pathname === '/preview/progress') return 'progress'
  if (pathname === '/preview/image-file' || pathname === '/preview/image') return 'image-file'
  if (pathname === '/preview/hover-action' || pathname === '/preview/hover-overlay' || pathname === '/preview/hover') return 'hover-action'
  if (pathname === '/preview/steppers' || pathname === '/preview/stepper') return 'steppers'
  if (pathname === '/preview/sidebar') return 'sidebar'
  if (pathname === '/preview/filter') return 'filter'
  if (pathname === '/preview/admin/activity-create') return 'activity-create'
  if (pathname === '/preview/orders' || pathname.startsWith('/preview/orders/')) return 'orders'
  if (pathname === '/preview/tasks') return 'tasks'
  return 'input-type'
}

function pathFromPage(page: PreviewPage): string {
  if (page === 'input-type') return '/preview/input-type'
  if (page === 'theme') return '/preview/theme'
  if (page === 'typography') return '/preview/typography'
  if (page === 'site-header') return '/preview/site-header'
  if (page === 'buttons') return '/preview/buttons'
  if (page === 'badges') return '/preview/badges'
  if (page === 'avatars') return '/preview/avatars'
  if (page === 'tabs') return '/preview/tabs'
  if (page === 'pagination') return '/preview/pagination'
  if (page === 'radio-checkbox') return '/preview/radio-checkbox'
  if (page === 'switch') return '/preview/switch'
  if (page === 'progress') return '/preview/progress'
  if (page === 'image-file') return '/preview/image-file'
  if (page === 'hover-action') return '/preview/hover-action'
  if (page === 'steppers') return '/preview/steppers'
  if (page === 'sidebar') return '/preview/sidebar'
  if (page === 'filter') return '/preview/filter'
  if (page === 'activity-create') return '/preview/admin/activity-create'
  if (page === 'orders') return '/preview/orders'
  if (page === 'tasks') return '/preview/tasks'
  return '/preview/input-type'
}

function App() {
  const [pathname, setPathname] = React.useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/preview/input-type',
  )
  const page = pageFromPath(pathname)
  const [theme, setTheme] = React.useState<ThemeMode>(getInitialTheme)
  const [headerSearch, setHeaderSearch] = React.useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  React.useEffect(() => {
    const onPop = () => setPathname(window.location.pathname)
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
    const nextPath = pathFromPage(next)
    setPathname(nextPath)
    if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }
  }

  const navigatePath = React.useCallback((nextPath: string) => {
    setPathname(nextPath)
    if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }
  }, [])

  return (
    <div className="flex h-svh w-full overflow-hidden bg-background text-foreground">
      <AppPreviewSidebar
        page={page}
        theme={theme}
        collapsed={sidebarCollapsed}
        onNavigate={navigate}
        onThemeChange={setTheme}
        onExpandSidebar={() => setSidebarCollapsed(false)}
      />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <PepTopBar
          value={headerSearch}
          onChange={setHeaderSearch}
          onMenuClick={() => setSidebarCollapsed((v) => !v)}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="shrink-0"
        />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          {page === 'input-type' ? (
            <InputTypePage />
          ) : page === 'typography' ? (
            <TypographyPage />
          ) : page === 'site-header' ? (
            <SiteHeaderPage />
          ) : page === 'buttons' ? (
            <ButtonsPage />
          ) : page === 'badges' ? (
            <BadgesPage />
          ) : page === 'avatars' ? (
            <AvatarsPage />
          ) : page === 'tabs' ? (
            <TabsPage />
          ) : page === 'pagination' ? (
            <PaginationPage />
          ) : page === 'radio-checkbox' ? (
            <RadioCheckboxPage />
          ) : page === 'switch' ? (
            <SwitchPage />
          ) : page === 'progress' ? (
            <ProgressPage />
          ) : page === 'image-file' ? (
            <ImageFilePage />
          ) : page === 'hover-action' ? (
            <HoverActionPage />
          ) : page === 'steppers' ? (
            <SteppersPage />
          ) : page === 'sidebar' ? (
            <MainMenuPage />
          ) : page === 'filter' ? (
            <FilterPage />
          ) : page === 'activity-create' ? (
            <ActivityCreatePage />
          ) : page === 'orders' ? (
            <OrdersAdminPage pathname={pathname} onNavigate={navigatePath} />
          ) : page === 'tasks' ? (
            <TaskManagementPage />
          ) : (
            <ThemeShowcase />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
