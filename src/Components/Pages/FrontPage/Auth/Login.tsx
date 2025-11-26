import { useState } from 'react'
import { Icon } from '@iconify/react'
import Footer from '../Footer'
import { useTranslation } from 'react-i18next'
import AuthProvider from 'Providers/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorState, setErrorState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorState(null)
    setIsLoading(true)
    const errorMsg = await AuthProvider.LoginLogic({ email, password })
    setIsLoading(false)
    if (errorMsg) {
      setErrorState(errorMsg)
    } else {
      // Redirect to intended destination or dashboard
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t('hud.AuthPage.Header.loginTitle')}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {t('hud.AuthPage.LoginForm.intro')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
            <Icon icon="logos:google-icon" className="text-lg" />
            {t('hud.AuthPage.LoginForm.google')}
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
            <Icon icon="mdi:github" className="text-lg" />
            {t('hud.AuthPage.LoginForm.github')}
          </button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900/50 px-2 text-slate-500 backdrop-blur-sm">
              {t('hud.AuthPage.orContinueWith')}
            </span>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-slate-300"
            >
              {t('hud.AuthPage.LoginForm.emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex h-11 w-full rounded-lg border bg-black/20 px-3 py-2 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                errorState
                  ? 'border-red-500/50 focus:ring-red-500/50'
                  : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20'
              }`}
              placeholder={t('hud.AuthPage.LoginForm.emailPlaceholder')}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none text-slate-300"
              >
                {t('hud.AuthPage.LoginForm.passwordLabel')}
              </label>
              <button
                type="button"
                onClick={() => navigate('/auth/forgot')}
                className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
              >
                {t('hud.AuthPage.LoginForm.forgotPassword')}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`flex h-11 w-full rounded-lg border bg-black/20 px-3 py-2 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                  errorState
                    ? 'border-red-500/50 focus:ring-red-500/50'
                    : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20'
                }`}
                placeholder={t('hud.AuthPage.LoginForm.passwordPlaceholder')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
              >
                <Icon
                  icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                  className="size-5"
                />
              </button>
            </div>
            {errorState && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-400">
                <Icon icon="mdi:alert-circle" />
                {errorState}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading ? (
              <Icon icon="eos-icons:loading" className="animate-spin text-xl" />
            ) : (
              t('hud.AuthPage.LoginForm.loginButton')
            )}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
