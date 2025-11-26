import { useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from 'Components/Utils/Logo'
import UserInfo from './UserInfo'

export default function HeaderMenu() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const themeMode = useSelector((state: RootState) => state.dom.theme)

  // Determine current dashboard state from URL
  const pathname = location.pathname
  const isPreview = pathname.includes('/dashboard/preview')
  const isAnalytics = pathname.includes('/dashboard/analytics')
  const isSettings = pathname.includes('/dashboard/settings') || pathname === '/dashboard'

  // Determine settings tab from URL
  const isNewItem = pathname.includes('/dashboard/settings/new')
  const isEditItem = pathname.includes('/dashboard/settings/edit')
  const isExplorer = isSettings && !isNewItem && !isEditItem

  function returnToSettings() {
    navigate('/dashboard/settings')
  }

  const goToExplorer = () => {
    navigate('/dashboard/settings')
  }

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 py-3 backdrop-blur-xl">
      <div
        onClick={() => navigate('/dashboard/settings')}
        className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
      >
        <Logo size="sm" theme={themeMode as 'light' | 'dark'} />
      </div>

      {/* Center Navigation Area */}
      <div className="flex flex-1 justify-center">
        {isAnalytics && (
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300">
            <Icon icon="mdi:google-analytics" className="size-4" />
            <span>Analytics</span>
          </div>
        )}

        {isPreview && (
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:eye" className="size-4" />
              <span>Preview</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <button
              onClick={returnToSettings}
              className="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-white"
            >
              <Icon icon="mdi:arrow-left" className="size-3" />
              <span>{t('hud.SettingsPage.Header.goBack', 'Go Back')}</span>
            </button>
          </div>
        )}

        {isSettings && (
          <>
            {isExplorer && (
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300">
                <Icon icon="mdi:view-dashboard" className="size-4" />
                <span>
                  {t('hud.SettingsPage.Header.projectsTitle', 'Projects')}
                </span>
              </div>
            )}

            {isNewItem && (
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300">
                <Icon icon="mdi:plus-circle" className="size-4" />
                <span>
                  {t(
                    'hud.SettingsPage.Header.createProjectTitle',
                    'Create Project'
                  )}
                </span>
                <div className="h-4 w-px bg-white/10" />
                <button
                  onClick={goToExplorer}
                  className="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-white"
                >
                  <Icon icon="mdi:arrow-left" className="size-3" />
                  <span>{t('hud.SettingsPage.Header.goBack', 'Go Back')}</span>
                </button>
              </div>
            )}

            {isEditItem && (
              <div className="relative flex w-64 rounded-lg border border-white/10 bg-black/20 p-1 backdrop-blur-sm">
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-y-1 rounded-md bg-indigo-500 shadow-lg shadow-indigo-500/25"
                  initial={false}
                  animate={{
                    left: '50%'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ width: 'calc(50% - 4px)' }}
                />

                <button
                  onClick={() => navigate('/dashboard/preview')}
                  className="relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-md py-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-200"
                >
                  <Icon icon="mdi:eye" className="size-4" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => navigate('/dashboard/settings')}
                  className="relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-md py-1.5 text-sm font-medium text-white transition-colors"
                >
                  <Icon icon="mdi:pencil" className="size-4" />
                  <span>Editor</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <UserInfo />
    </div>
  )
}
