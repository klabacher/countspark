import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'

export default function ActivatePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-emerald-500/30">
            <Icon
              icon="mdi:email-check-outline"
              className="text-4xl text-emerald-400"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t('hud.AuthPage.Activate.title', 'Check Your Email')}
          </h1>
          <p className="mt-2 max-w-sm text-sm text-slate-400">
            {t(
              'hud.AuthPage.Activate.intro',
              "We've sent a verification link to your email address. Please check your inbox and click the link to activate your account."
            )}
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-start gap-3">
              <Icon
                icon="mdi:information-outline"
                className="mt-0.5 text-xl text-indigo-400"
              />
              <div className="text-sm text-slate-300">
                <p className="font-medium">
                  {t(
                    'hud.AuthPage.Activate.tipTitle',
                    "Didn't receive the email?"
                  )}
                </p>
                <p className="mt-1 text-slate-400">
                  {t(
                    'hud.AuthPage.Activate.tipDescription',
                    'Check your spam folder or request a new verification email.'
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          <button
            onClick={() => {
              // TODO: Implement resend verification email
              console.log('Resend verification email')
            }}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <Icon icon="mdi:email-sync-outline" className="text-lg" />
            {t(
              'hud.AuthPage.Activate.resendButton',
              'Resend Verification Email'
            )}
          </button>

          <button
            onClick={() => navigate('/auth/login')}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95"
          >
            <Icon icon="mdi:login" className="text-lg" />
            {t('hud.AuthPage.Activate.loginButton', 'Go to Login')}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
