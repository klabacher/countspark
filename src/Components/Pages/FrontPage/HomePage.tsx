import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import CountSparkLogo from '../../Utils/Logo'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { updateFrontPageState } from 'Providers/ReduxProvider/DOMState'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useNavigate } from 'react-router-dom'
import AuthProvider from 'Providers/AuthProvider'

const VerticalSeparator = () => (
  <div className="hidden h-20 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent md:block" />
)

const Separator = () => <hr className="my-2 w-1/2 border-t border-slate-200" />

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
    <div className="relative flex size-full flex-col items-center justify-center gap-6 p-4">
      {/* TODO: review this style and fitting */}
      {isAuthenticated && user && (
        <div className="absolute right-4 top-4 flex items-center gap-4 rounded-sm border border-white/10 bg-slate-900/80 p-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-slate-200">
            <Icon icon="mdi:account-circle" className="text-3xl" />
            <span className="text-2xl font-medium">
              {t('hud.HomePage.hello')}, {user.name}
            </span>
          </div>
          <button
            onClick={async () => {
              await AuthProvider.LogoutLogic()
              navigate('/')
            }}
            className="flex items-center gap-1 rounded-sm bg-red-500/10 px-2 py-1 text-lg font-medium text-red-400 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-red-500/20 hover:text-red-300"
          >
            <Icon icon="mdi:logout" />
            {t('hud.HomePage.logout')}
          </button>
        </div>
      )}

      {/* Logo Container */}
      <div className="relative flex size-auto items-center justify-center rounded-sm border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="z-10">
          <CountSparkLogo size="lg" theme="dark" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text font-mono text-3xl font-bold text-transparent md:text-5xl">
          {t('hud.HomePage.welcome')}
        </h1>
      </div>

      <Separator />

      {/* Content Section - Compact & Contained */}

      <div className="flex max-w-2xl flex-col items-center gap-6 rounded-sm border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-sm md:flex-row md:justify-center md:gap-10 md:px-8">
        <div className="w-auto max-w-[220px] text-center md:text-right">
          <h1 className="text-xl font-bold leading-tight text-slate-200 md:text-2xl">
            {isAuthenticated
              ? t('hud.HomePage.welcomeBack')
              : t('hud.HomePage.intro')}
          </h1>
        </div>

        <VerticalSeparator />

        <div className="flex w-auto flex-col items-center gap-3 md:items-start">
          <p className="font-mono text-sm text-slate-300">
            {t('hud.HomePage.getStarted')}
          </p>
          <div className="flex w-full flex-col gap-2 sm:w-auto">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="group relative flex w-full items-center justify-center gap-2 rounded-sm border border-indigo-500/20 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 font-mono text-sm font-bold text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25 active:scale-95"
              >
                <Icon icon="mdi:view-dashboard" className="text-lg" />
                {t('hud.HomePage.letsCreate')}
              </button>
            ) : (
              <>
                <button
                  onClick={() => setSelectedDiv('auth:login')}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-sm border border-amber-500/20 bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 font-mono text-sm font-bold text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:from-amber-700 hover:to-orange-700 hover:shadow-orange-500/25 active:scale-95"
                >
                  <Icon icon="mdi:login" className="text-lg" />
                  {t('hud.HomePage.loginButton')}
                </button>

                <button
                  onClick={() => setSelectedDiv('auth:register')}
                  className="group flex w-full items-center justify-center gap-2 rounded-sm border border-slate-700 bg-slate-800/50 px-4 py-2 font-mono text-sm font-bold text-slate-300 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-slate-800 hover:text-white active:scale-95"
                >
                  <Icon icon="mdi:account-plus" className="text-lg" />
                  {t('hud.HomePage.signupButton')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="flex size-full flex-col bg-slate-800 p-2 md:w-1/2">
      <BodyMenu />
      <Footer />
    </div>
  )
}

export default HomePage
