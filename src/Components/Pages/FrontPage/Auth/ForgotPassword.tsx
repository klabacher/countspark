import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'

export default function ForgotPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendCode = async () => {
    if (!email) return
    setIsLoading(true)
    // TODO: Implement actual email sending via Supabase
    console.log('Sending code to', email)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Navigate to steps page with email as query param
    navigate(`/auth/steps?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 ring-1 ring-indigo-500/30">
            <Icon icon="mdi:lock-reset" className="text-3xl text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t('hud.AuthPage.ForgotPassword.title', 'Reset Password')}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {t(
              'hud.AuthPage.ForgotPassword.intro',
              "Enter your email address and we'll send you a code to reset your password."
            )}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-slate-300"
            >
              {t('hud.AuthPage.ForgotPassword.emailLabel', 'Email Address')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder={t(
                'hud.AuthPage.LoginForm.emailPlaceholder',
                'you@example.com'
              )}
            />
          </div>

          <button
            onClick={handleSendCode}
            disabled={!email || isLoading}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isLoading ? (
              <Icon icon="mdi:loading" className="animate-spin text-lg" />
            ) : (
              <>
                {t('hud.AuthPage.ForgotPassword.sendCodeButton', 'Send Reset Code')}
                <Icon icon="mdi:arrow-right" className="text-lg" />
              </>
            )}
          </button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
          </div>

          <button
            onClick={() => navigate('/auth/login')}
            className="flex w-full items-center justify-center gap-2 p-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <Icon icon="mdi:arrow-left" />
            {t('hud.AuthPage.ForgotPassword.backToLoginButton', 'Back to Login')}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
