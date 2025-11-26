import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import CountSparkLogo from '../../Utils/Logo'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { updateFrontPageState } from 'Providers/ReduxProvider/DOMState'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useNavigate } from 'react-router-dom'
import AuthProvider from 'Providers/AuthProvider'
import { motion } from 'framer-motion'
import ImageContainer from 'Components/Utils/RandomImage'

const VerticalSeparator = () => (
  <div className="hidden h-20 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />
)

const Separator = () => <hr className="my-6 w-1/2 border-t border-white/10" />

export function LogoImageContainer({
  context
}: {
  context: 'frontpage' | 'auth'
}) {
  return (
    <div className="relative flex h-screen w-3/4 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <ImageContainer
          sizeFull={true}
          context={context === 'frontpage' ? 'frontpage' : 'auth'}
        />
      </div>

      {/* Overlay escuro para garantir leitura em qualquer imagem */}
      <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm dark:bg-slate-950/80 dark:mix-blend-multiply" />

      {/* Logo Layer - on top */}
      <div className="relative z-20 flex items-center justify-center">
        <CountSparkLogo size="xl" theme="dark" />
      </div>
    </div>
  )
}

function BodyMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const isAuthenticated = useSelector(
    (state: RootState) => state.dom.AuthInfo.isAuthenticated
  )
  const user = useSelector((state: RootState) => state.dom.AuthInfo.user)

  const setSelectedDiv = (value: 'image' | 'auth:login' | 'auth:register') => {
    dispatch(updateFrontPageState({ state: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex size-full flex-col items-center justify-center gap-8 p-6"
    >
      {/* Auth Header */}
      {isAuthenticated && user && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-4 top-4 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-2 shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center gap-2 px-2 text-slate-200">
            <Icon
              icon="mdi:account-circle"
              className="text-2xl text-indigo-400"
            />
            <span className="text-sm font-medium">
              {t('hud.HomePage.hello')}, {user.name}
            </span>
          </div>
          <button
            onClick={async () => {
              await AuthProvider.LogoutLogic()
              navigate('/')
            }}
            className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300"
          >
            <Icon icon="mdi:logout" />
            {t('hud.HomePage.logout')}
          </button>
        </motion.div>
      )}

      {/* Welcome Text */}
      <div className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text font-sans text-4xl font-bold tracking-tight text-transparent drop-shadow-sm md:text-6xl">
          {t('hud.HomePage.welcome')}
        </h1>
        <p className="text-lg font-light text-slate-400">
          Master your time with style
        </p>
      </div>

      <Separator />

      {/* Content Section */}
      <div className="glass-panel flex max-w-3xl flex-col items-center gap-8 p-8 md:flex-row md:justify-center md:gap-12 md:px-10">
        <div className="w-auto max-w-[240px] text-center md:text-right">
          <h2 className="text-2xl font-bold leading-tight text-slate-100 md:text-3xl">
            {isAuthenticated
              ? t('hud.HomePage.welcomeBack')
              : t('hud.HomePage.intro')}
          </h2>
        </div>

        <VerticalSeparator />

        <div className="flex w-auto flex-col items-center gap-4 md:items-start">
          <p className="max-w-xs text-center font-sans text-sm text-slate-400 md:text-left">
            {t('hud.HomePage.getStarted')}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-sans text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95"
              >
                <Icon icon="mdi:view-dashboard" className="text-xl" />
                {t('hud.HomePage.letsCreate')}
              </button>
            ) : (
              <>
                <button
                  onClick={() => setSelectedDiv('auth:login')}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-sans text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-400 hover:to-orange-500 hover:shadow-orange-500/35 active:scale-95"
                >
                  <Icon icon="mdi:login" className="text-xl" />
                  {t('hud.HomePage.loginButton')}
                </button>

                <button
                  onClick={() => setSelectedDiv('auth:register')}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-sans text-sm font-bold text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95"
                >
                  <Icon icon="mdi:account-plus" className="text-xl" />
                  {t('hud.HomePage.signupButton')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function HomePage() {
  return (
    <div className="flex size-full flex-col items-center justify-center p-4 md:w-1/2">
      <BodyMenu />
      <Footer />
    </div>
  )
}

export default HomePage
