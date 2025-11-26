import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import { updateFrontPageState } from 'Providers/ReduxProvider/DOMState'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

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
    <div className="sticky top-0 z-50 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      {/* <div
        onClick={() => setSelectedDiv('home')}
        className="cursor-pointer transition-opacity duration-300 hover:opacity-80"
      >
        <Logo size="sm" theme="dark" />
      </div> */}

      {/* Toggle input checkbox */}
      {(FrontPageState === 'auth:login' ||
        FrontPageState === 'auth:register') && (
        <div className="relative flex w-3/4 max-w-[300px] rounded-xl border border-slate-200 bg-slate-100 p-1 backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
          {/* Fundo Animado (A "Pílula" Branca) */}
          <motion.div
            layoutId="active-pill"
            className="absolute inset-y-1 rounded-lg bg-white shadow-sm dark:bg-indigo-500 dark:shadow-indigo-500/25"
            initial={false}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: 'calc(50% - 4px)',
              left: FrontPageState === 'auth:login' ? '4px' : '50%'
            }}
          />

          {/* Botão Login */}
          <button
            onClick={() => setSelectedDiv('auth:login')}
            className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors duration-200 ${
              FrontPageState === 'auth:login'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <span>{t('hud.AuthPage.Header.loginLabel')}</span>
            <Icon icon="mdi:login" className="size-4" />
          </button>

          {/* Botão Registrar */}
          <button
            onClick={() => setSelectedDiv('auth:register')}
            className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors duration-200 ${
              FrontPageState === 'auth:register'
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <span className="whitespace-nowrap">
              {t('hud.AuthPage.Header.registerLabel')}
            </span>
            <Icon icon="mdi:account-plus" className="size-4" />
          </button>
        </div>
      )}

      {FrontPageState === 'auth:forgot-password' && (
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Reset Password
        </div>
      )}

      <div>
        {FrontPageState !== 'home' && (
          <button
            onClick={() => setSelectedDiv('home')}
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-white"
          >
            <Icon
              icon="mdi:arrow-left"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {t('hud.AuthPage.Header.gobackButton')}
          </button>
        )}
      </div>
    </div>
  )
}
