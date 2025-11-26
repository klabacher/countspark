import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Footer from '../Footer'

type Step = 1 | 2 | 3

export default function ResetStepsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const emailFromParams = searchParams.get('email') || ''

  const [step, setStep] = useState<Step>(1)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { number: 1, label: t('hud.AuthPage.ResetSteps.step1', 'Verify') },
    { number: 2, label: t('hud.AuthPage.ResetSteps.step2', 'Reset') },
    { number: 3, label: t('hud.AuthPage.ResetSteps.step3', 'Done') }
  ]

  const handleVerifyCode = async () => {
    setIsLoading(true)
    // TODO: Implement code verification
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Verifying code:', code)
    setIsLoading(false)
    setStep(2)
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      // TODO: Show error toast
      return
    }
    setIsLoading(true)
    // TODO: Implement password reset
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Resetting password')
    setIsLoading(false)
    setStep(3)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t('hud.AuthPage.ResetSteps.title', 'Reset Your Password')}
          </h1>
          {emailFromParams && (
            <p className="mt-2 text-sm text-slate-400">
              {t('hud.AuthPage.ResetSteps.sentTo', 'Code sent to')}{' '}
              <span className="text-indigo-400">{emailFromParams}</span>
            </p>
          )}
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div
                className={`flex size-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
                  step >= s.number
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white'
                    : 'border border-white/10 bg-white/5 text-slate-500'
                }`}
              >
                {step > s.number ? (
                  <Icon icon="mdi:check" className="text-lg" />
                ) : (
                  s.number
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-8 transition-all ${
                    step > s.number ? 'bg-indigo-500' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait" custom={step}>
          <motion.div
            key={step}
            custom={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    {t(
                      'hud.AuthPage.ResetSteps.codeLabel',
                      'Verification Code'
                    )}
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="flex h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-center font-mono text-lg tracking-widest text-slate-100 transition-all placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <button
                  onClick={handleVerifyCode}
                  disabled={code.length < 6 || isLoading}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <Icon icon="mdi:loading" className="animate-spin text-lg" />
                  ) : (
                    <>
                      {t('hud.AuthPage.ResetSteps.verifyButton', 'Verify Code')}
                      <Icon icon="mdi:arrow-right" className="text-lg" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    {t(
                      'hud.AuthPage.ResetSteps.newPasswordLabel',
                      'New Password'
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 pr-10 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    {t(
                      'hud.AuthPage.ResetSteps.confirmPasswordLabel',
                      'Confirm Password'
                    )}
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  onClick={handleResetPassword}
                  disabled={!newPassword || !confirmPassword || isLoading}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <Icon icon="mdi:loading" className="animate-spin text-lg" />
                  ) : (
                    <>
                      {t(
                        'hud.AuthPage.ResetSteps.resetButton',
                        'Reset Password'
                      )}
                      <Icon icon="mdi:check" className="text-lg" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1
                  }}
                  className="mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-emerald-500/30"
                >
                  <Icon
                    icon="mdi:check-circle"
                    className="text-4xl text-emerald-400"
                  />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {t(
                      'hud.AuthPage.ResetSteps.successTitle',
                      'Password Reset!'
                    )}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {t(
                      'hud.AuthPage.ResetSteps.successMessage',
                      'Your password has been successfully reset. You can now login with your new password.'
                    )}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95"
                >
                  <Icon icon="mdi:login" className="text-lg" />
                  {t('hud.AuthPage.ResetSteps.loginButton', 'Go to Login')}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < 3 && (
          <button
            onClick={() => navigate('/auth/forgot')}
            className="mt-4 flex w-full items-center justify-center gap-1 text-sm text-slate-400 transition-colors hover:text-slate-200"
          >
            <Icon icon="mdi:arrow-left" />
            {t('hud.AuthPage.ResetSteps.backButton', 'Back')}
          </button>
        )}
      </div>
      <Footer />
    </div>
  )
}
