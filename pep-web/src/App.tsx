import './App.css'

import * as React from 'react'

import { AppPreviewSidebar, type PreviewPage } from '@/components/app-preview-sidebar'
import { PepTopBar } from '@/components/pep-chrome'
import { TooltipProvider } from '@/components/ui/tooltip'

import { ThemeShowcase } from './pages/ThemeShowcase'
import { TypographyPage } from './pages/TypographyPage'
import { SiteHeaderPage } from './pages/SiteHeaderPage'
import { ButtonsPage } from './pages/ButtonsPage'
import { ButtonGroupPage } from './pages/ButtonGroupPage'
import { BadgesPage } from './pages/BadgesPage'
import { TooltipsPage } from './pages/TooltipsPage'
import { AvatarsPage } from './pages/AvatarsPage'
import { TabsPage } from './pages/TabsPage'
import { PaginationPage } from './pages/PaginationPage'
import { RadioCheckboxPage } from './pages/RadioCheckboxPage'
import { SwitchPage } from './pages/SwitchPage'
import { TogglePage } from './pages/TogglePage'
import { ToggleGroupPage } from './pages/ToggleGroupPage'
import { ProgressPage } from './pages/ProgressPage'
import { RichtextPage } from './pages/RichtextPage'
import { ImageFilePage } from './pages/ImageFilePage'
import { HoverActionPage } from './pages/HoverActionPage'
import { DropdownMenuPage } from './pages/DropdownMenuPage'
import { SteppersPage } from './pages/SteppersPage'
import { MainMenuPage } from './pages/MainMenuPage'
import { SidebarBlockPage } from './pages/SidebarBlockPage'
import { TableCellBlockPage } from './pages/TableCellBlockPage'
import { FilterRowBlockPage } from './pages/FilterRowBlockPage'
import { FormMenuBlockPage } from './pages/FormMenuBlockPage'
import { FormBottomBlockPage } from './pages/FormBottomBlockPage'
import { FooterBlockPage } from './pages/FooterBlockPage'
import { PageHeaderBlockPage } from './pages/PageHeaderBlockPage'
import { PopupHeaderBlockPage } from './pages/PopupHeaderBlockPage'
import { FullPagePopupPage } from './pages/FormsLayoutPage'
import { TablePage } from './pages/TablePage'
import { InputTypePage } from './pages/InputTypePage'
import { FilterPage } from './pages/FilterPage'
import { OrdersAdminPage } from './pages/OrdersAdminPage'
import { TaskManagementPage } from './pages/TaskManagementPage'
import { ActivityCreateDialog } from './pages/ActivityCreatePage'
import { ActivityListPage } from './pages/ActivityListPage'

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
  if (pathname === '/preview/button-group') return 'button-group'
  if (pathname === '/preview/badges') return 'badges'
  if (pathname === '/preview/tooltips' || pathname === '/preview/tooltip') return 'tooltips'
  if (pathname === '/preview/avatars') return 'avatars'
  if (pathname === '/preview/tabs') return 'tabs'
  if (pathname === '/preview/pagination') return 'pagination'
  if (pathname === '/preview/radio-checkbox' || pathname === '/preview/radio' || pathname === '/preview/checkbox') return 'radio-checkbox'
  if (pathname === '/preview/switch') return 'switch'
  if (pathname === '/preview/toggle') return 'toggle'
  if (pathname === '/preview/toggle-group') return 'toggle-group'
  if (pathname === '/preview/progress') return 'progress'
  if (pathname === '/preview/richtext') return 'richtext'
  if (pathname === '/preview/image-file' || pathname === '/preview/image') return 'image-file'
  if (pathname === '/preview/hover-action' || pathname === '/preview/hover-overlay' || pathname === '/preview/hover') return 'hover-action'
  if (pathname === '/preview/dropdown-menu' || pathname === '/preview/dropdown') return 'dropdown-menu'
  if (pathname === '/preview/steppers' || pathname === '/preview/stepper') return 'steppers'
  if (pathname === '/preview/sidebar-items' || pathname === '/preview/main-menu') return 'sidebar-items'
  if (pathname === '/preview/sidebar') return 'sidebar'
  if (pathname === '/preview/table-cell') return 'table-cell'
  if (pathname === '/preview/filter-row') return 'filter-row'
  if (pathname === '/preview/form-menu') return 'form-menu'
  if (pathname === '/preview/form-bottom') return 'form-bottom'
  if (pathname === '/preview/footer') return 'footer'
  if (pathname === '/preview/page-header') return 'page-header'
  if (pathname === '/preview/popup-header') return 'popup-header'
  if (pathname === '/preview/forms' || pathname === '/preview/full-page-popup-form') return 'full-page-popup'
  if (pathname === '/preview/full-page-popup-table' || pathname === '/preview/full-page-popup') return 'full-page-popup'
  if (pathname === '/preview/table') return 'table'
  if (pathname === '/preview/filter') return 'filter'
  if (pathname === '/preview/admin/activity-create') return 'activity-create'
  if (pathname === '/preview/admin/activities' || pathname === '/preview/activities') return 'activity-list'
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
  if (page === 'button-group') return '/preview/button-group'
  if (page === 'badges') return '/preview/badges'
  if (page === 'tooltips') return '/preview/tooltips'
  if (page === 'avatars') return '/preview/avatars'
  if (page === 'tabs') return '/preview/tabs'
  if (page === 'pagination') return '/preview/pagination'
  if (page === 'radio-checkbox') return '/preview/radio-checkbox'
  if (page === 'switch') return '/preview/switch'
  if (page === 'toggle') return '/preview/toggle'
  if (page === 'toggle-group') return '/preview/toggle-group'
  if (page === 'progress') return '/preview/progress'
  if (page === 'richtext') return '/preview/richtext'
  if (page === 'image-file') return '/preview/image-file'
  if (page === 'hover-action') return '/preview/hover-action'
  if (page === 'dropdown-menu') return '/preview/dropdown-menu'
  if (page === 'steppers') return '/preview/steppers'
  if (page === 'sidebar-items') return '/preview/sidebar-items'
  if (page === 'sidebar') return '/preview/sidebar'
  if (page === 'table-cell') return '/preview/table-cell'
  if (page === 'filter-row') return '/preview/filter-row'
  if (page === 'form-menu') return '/preview/form-menu'
  if (page === 'form-bottom') return '/preview/form-bottom'
  if (page === 'footer') return '/preview/footer'
  if (page === 'page-header') return '/preview/page-header'
  if (page === 'popup-header') return '/preview/popup-header'
  if (page === 'full-page-popup') return '/preview/full-page-popup'
  if (page === 'table') return '/preview/table'
  if (page === 'filter') return '/preview/filter'
  if (page === 'activity-create') return '/preview/admin/activity-create'
  if (page === 'activity-list') return '/preview/admin/activities'
  if (page === 'orders') return '/preview/orders'
  if (page === 'tasks') return '/preview/tasks'
  return '/preview/input-type'
}

function App() {
  const [pathname, setPathname] = React.useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/preview/input-type',
  )
  const page = pageFromPath(pathname)
  /** Keep Demo → 活動 highlighted while on 新增活動 (create is reached via +). */
  const sidebarPage: PreviewPage = page === "activity-create" ? "activity-list" : page
  const [theme, setTheme] = React.useState<ThemeMode>(getInitialTheme)
  const [headerSearch, setHeaderSearch] = React.useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  React.useEffect(() => {
    const onPop = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Prevent accidental horizontal scroll from clipping the left shell sidebar.
  React.useEffect(() => {
    document.documentElement.scrollLeft = 0
    document.body.scrollLeft = 0
  }, [pathname])

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
    <TooltipProvider>
    <div className="flex h-svh w-full overflow-hidden overflow-x-hidden bg-background text-foreground">
      <AppPreviewSidebar
        page={sidebarPage}
        collapsed={sidebarCollapsed}
        onNavigate={navigate}
        onExpandSidebar={() => setSidebarCollapsed(false)}
      />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-contain">
          <PepTopBar
            value={headerSearch}
            onChange={setHeaderSearch}
            onMenuClick={() => setSidebarCollapsed((v) => !v)}
            theme={theme}
            onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          />
          {page === 'input-type' ? (
            <InputTypePage />
          ) : page === 'typography' ? (
            <TypographyPage />
          ) : page === 'site-header' ? (
            <SiteHeaderPage />
          ) : page === 'buttons' ? (
            <ButtonsPage />
          ) : page === 'button-group' ? (
            <ButtonGroupPage />
          ) : page === 'badges' ? (
            <BadgesPage />
          ) : page === 'tooltips' ? (
            <TooltipsPage />
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
          ) : page === 'toggle' ? (
            <TogglePage />
          ) : page === 'toggle-group' ? (
            <ToggleGroupPage />
          ) : page === 'progress' ? (
            <ProgressPage />
          ) : page === 'richtext' ? (
            <RichtextPage />
          ) : page === 'image-file' ? (
            <ImageFilePage />
          ) : page === 'hover-action' ? (
            <HoverActionPage />
          ) : page === 'dropdown-menu' ? (
            <DropdownMenuPage />
          ) : page === 'steppers' ? (
            <SteppersPage />
          ) : page === 'sidebar-items' ? (
            <MainMenuPage />
          ) : page === 'sidebar' ? (
            <SidebarBlockPage />
          ) : page === 'table-cell' ? (
            <TableCellBlockPage />
          ) : page === 'filter-row' ? (
            <FilterRowBlockPage />
          ) : page === 'form-menu' ? (
            <FormMenuBlockPage />
          ) : page === 'form-bottom' ? (
            <FormBottomBlockPage />
          ) : page === 'footer' ? (
            <FooterBlockPage />
          ) : page === 'page-header' ? (
            <PageHeaderBlockPage />
          ) : page === 'popup-header' ? (
            <PopupHeaderBlockPage />
          ) : page === 'full-page-popup' ? (
            <FullPagePopupPage />
          ) : page === 'table' ? (
            <TablePage />
          ) : page === 'filter' ? (
            <FilterPage />
          ) : page === 'activity-list' || page === 'activity-create' ? (
            <>
              <ActivityListPage onCreate={() => navigate('activity-create')} />
              <ActivityCreateDialog
                open={page === 'activity-create'}
                onOpenChange={(next) => {
                  if (!next) navigate('activity-list')
                }}
              />
            </>
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
    </TooltipProvider>
  )
}

export default App
