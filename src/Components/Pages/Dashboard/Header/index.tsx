import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import {
  updateDashboardPageState,
  updateSettingsTabState
} from 'Providers/ReduxProvider/DOMState'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import Logo from 'Components/Utils/Logo'
import UserInfo from './UserInfo'

export default function HeaderMenu() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const DashboardState = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.state
  )
  const themeMode = useSelector(
    (state: RootState) => state.dom.selectedStyleMode
  )

  function returnToSettings() {
    // Logic to return to settings
    dispatch(
      updateDashboardPageState({
        state: 'settings'
      })
    )
  }

  const setSettingsTabState = () => {
    dispatch(updateSettingsTabState('TabExplorerMenu'))
  }

  const setSelectedDiv = (state: 'preview' | 'settings' | 'analytics') => {
    dispatch(updateDashboardPageState({ state: state }))
  }
  const SettingsTab = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.SettingsTab
  )

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/80">
      <div
        onClick={() => setSelectedDiv('settings')}
        className="cursor-pointer transition-opacity hover:opacity-80"
      >
        <Logo size="sm" theme={themeMode as 'light' | 'dark'} />
      </div>

      {/* Center Navigation Area */}
      <div className="flex flex-1 justify-center">
        {DashboardState === 'analytics' && (
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <Icon icon="mdi:google-analytics" className="size-4" />
            <span>Analytics</span>
          </div>
        )}

        {DashboardState === 'preview' && (
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:eye" className="size-4" />
              <span>Preview</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-white/10" />
            <button
              onClick={returnToSettings}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <Icon icon="mdi:arrow-left" className="size-3" />
              <span>{t('hud.SettingsPage.Header.goBack', 'Go Back')}</span>
            </button>
          </div>
        )}

        {DashboardState === 'settings' && (
          <>
            {SettingsTab === 'TabExplorerMenu' && (
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                <Icon icon="mdi:view-dashboard" className="size-4" />
                <span>
                  {t('hud.SettingsPage.Header.projectsTitle', 'Projects')}
                </span>
              </div>
            )}

            {SettingsTab === 'TabCreateItem' && (
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                <Icon icon="mdi:plus-circle" className="size-4" />
                <span>
                  {t(
                    'hud.SettingsPage.Header.createProjectTitle',
                    'Create Project'
                  )}
                </span>
                <div className="h-4 w-px bg-slate-300 dark:bg-white/10" />
                <button
                  onClick={setSettingsTabState}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <Icon icon="mdi:arrow-left" className="size-3" />
                  <span>{t('hud.SettingsPage.Header.goBack', 'Go Back')}</span>
                </button>
              </div>
            )}

            {SettingsTab === 'TabEditItem' && (
              <div className="relative flex w-64 rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-white/10 dark:bg-slate-950/50">
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-y-1 rounded-full bg-white shadow-sm ring-1 ring-black/5 dark:bg-indigo-500 dark:shadow-lg dark:shadow-indigo-500/25 dark:ring-0"
                  initial={false}
                  animate={{
                    left: '50%'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ width: 'calc(50% - 4px)' }}
                />

                <button
                  onClick={() => setSelectedDiv('preview')}
                  className="relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-full py-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <Icon icon="mdi:eye" className="size-4" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => setSelectedDiv('settings')}
                  className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-full py-1.5 text-sm font-medium transition-colors ${
                    DashboardState === 'settings'
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
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
