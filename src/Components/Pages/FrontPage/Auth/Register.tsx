import { useState } from 'react'
import { Icon } from '@iconify/react'
import Footer from '../Footer'
import AuthProvider from 'Providers/AuthProvider'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorState(null)
    setIsLoading(true)
    const errorMsg = await AuthProvider.RegisterLogic({ name, password, email })
    setIsLoading(false)
    if (errorMsg) {
      setErrorState(errorMsg)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-sm border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t('hud.AuthPage.Header.registerTitle')}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {t('hud.AuthPage.RegisterForm.intro')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white">
            <Icon icon="logos:google-icon" className="text-lg" />
            {t('hud.AuthPage.RegisterForm.google')}
          </button>
          <button className="flex items-center justify-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white">
            <Icon icon="mdi:github" className="text-lg" />
            {t('hud.AuthPage.RegisterForm.github')}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              {t('hud.AuthPage.orContinueWith')}
            </span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={submitRegister}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('hud.AuthPage.RegisterForm.usernameLabel')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
              placeholder={t('hud.AuthPage.RegisterForm.namePlaceholder')}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('hud.AuthPage.RegisterForm.emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
              placeholder={t('hud.AuthPage.RegisterForm.emailPlaceholder')}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('hud.AuthPage.RegisterForm.passwordLabel')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-sm border border-slate-300 bg-transparent px-3 py-2 text-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <Icon
                  icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                  className="size-5"
                />
              </button>
            </div>
            {errorState && (
              <p className="mt-1 text-xs text-red-500">{errorState}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-10 w-full items-center justify-center rounded-sm border border-indigo-500/20 bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-indigo-700 hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-slate-900"
          >
            {isLoading ? (
              <Icon icon="eos-icons:loading" className="animate-spin text-xl" />
            ) : (
              t('hud.AuthPage.RegisterForm.registerButton')
            )}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
