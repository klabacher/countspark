import { Icon } from '@iconify/react'
import AuthProvider from 'Providers/AuthProvider'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// TODO: Add profile options menu
export default function UserInfo() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const userName = useSelector(
    (state: RootState) => state.dom.AuthInfo.user?.name
  )

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 rounded-sm border border-slate-200 bg-slate-50/50 py-1.5 pl-1.5 pr-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
          <Icon icon="mdi:account" className="text-lg" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {t('hud.HomePage.hello')}
          </span>
          <span className="text-sm font-semibold leading-none text-slate-900 dark:text-white">
            {userName || 'User'}
          </span>
        </div>
      </div>

      <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />

      <button
        onClick={async () => {
          await AuthProvider.LogoutLogic()
          navigate('/')
        }}
        className="group flex size-9 items-center justify-center rounded-sm border border-transparent text-slate-400 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-500"
        title={t('hud.HomePage.logout')}
      >
        <Icon
          icon="mdi:logout"
          className="text-xl transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-x-0.5"
        />
      </button>
    </div>
  )
}
