import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import { updateFrontPageState } from 'Providers/ReduxProvider/DOMState'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import Logo from '../../../Utils/Logo'

export default function HeaderMenu() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const FrontPageState = useSelector(
    (state: RootState) => state.dom.PageInfo.FrontPage.state
  )

  const setSelectedDiv = (
    value: 'home' | 'auth:login' | 'auth:register' | 'auth:forgot-password'
  ) => {
    dispatch(updateFrontPageState({ state: value }))
  }

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
      <div
        onClick={() => setSelectedDiv('home')}
        className="cursor-pointer transition-opacity duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:opacity-80"
      >
        <Logo size="sm" theme="dark" />
      </div>

      {/* Toggle input checkbox */}
      <div className="relative flex w-1/2 rounded-sm border border-white/10 bg-slate-950/50 p-1 backdrop-blur-sm">
        {/* Fundo Animado (A "Pílula" Branca) */}
        <motion.div
          layoutId="active-pill"
          className="absolute inset-y-1 rounded-sm bg-indigo-500 shadow-lg shadow-indigo-500/25"
          initial={false}
          transition={{ ease: 'circOut', duration: 0.3 }}
          style={{
            width: 'calc(50% - 4px)',
            left: FrontPageState === 'auth:login' ? '4px' : '50%'
          }}
        />

        {/* Botão Login */}
        <button
          onClick={() => setSelectedDiv('auth:login')}
          className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-sm py-3 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            FrontPageState === 'auth:login'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>{t('hud.AuthPage.Header.loginLabel')}</span>
          <Icon icon="mdi:login" className="size-4" />
        </button>

        {/* Botão Registrar */}
        <button
          onClick={() => setSelectedDiv('auth:register')}
          className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-sm py-3 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            FrontPageState === 'auth:register'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="whitespace-nowrap">
            {t('hud.AuthPage.Header.registerLabel')}
          </span>
          <Icon icon="mdi:account-plus" className="size-4" />
        </button>
      </div>

      <div>
        {FrontPageState !== 'home' && (
          <button
            onClick={() => setSelectedDiv('home')}
            className="group flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <Icon
              icon="mdi:arrow-left"
              className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-x-1"
            />
            {t('hud.AuthPage.Header.gobackButton')}
          </button>
        )}
      </div>
    </div>
  )
}
