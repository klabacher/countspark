import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { updateFrontPageState } from 'Providers/ReduxProvider/DOMState'
import Footer from '../Footer'

export default function ForgotPassword() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSendCode = () => {
    // Mock sending code
    console.log('Sending code to', email)
    setStep(2)
  }

  const handleVerifyCode = () => {
    // Mock verifying code
    console.log('Verifying code', code)
    setStep(3)
  }

  const handleResetPassword = () => {
    // Mock resetting password
    console.log(
      'Resetting password for',
      email,
      'with new password',
      newPassword
    )
    // Show success message or redirect
    dispatch(updateFrontPageState({ state: 'auth:login' }))
  }

  const goBackToLogin = () => {
    dispatch(updateFrontPageState({ state: 'auth:login' }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t('hud.AuthPage.ForgotPassword.title')}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {t('hud.AuthPage.ForgotPassword.intro')}
          </p>
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-slate-300"
                >
                  {t('hud.AuthPage.ForgotPassword.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder={t('hud.AuthPage.LoginForm.emailPlaceholder')}
                />
              </div>
              <button
                onClick={handleSendCode}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95"
              >
                {t('hud.AuthPage.ForgotPassword.sendCodeButton')}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="code"
                  className="text-sm font-medium leading-none text-slate-300"
                >
                  {t('hud.AuthPage.ForgotPassword.codeLabel')}
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="123456"
                />
              </div>
              <button
                onClick={handleVerifyCode}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95"
              >
                {t('hud.AuthPage.ForgotPassword.verifyCodeButton')}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium leading-none text-slate-300"
                >
                  {t('hud.AuthPage.ForgotPassword.newPasswordLabel')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
              </div>
              <button
                onClick={handleResetPassword}
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95"
              >
                {t('hud.AuthPage.ForgotPassword.resetPasswordButton')}
              </button>
            </>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
          </div>

          <button
            onClick={goBackToLogin}
            className="flex w-full items-center justify-center gap-2 p-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <Icon icon="mdi:arrow-left" />
            {t('hud.AuthPage.ForgotPassword.backToLoginButton')}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
