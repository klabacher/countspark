import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'

export default function SocialAuthPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'logos:google-icon',
      description: 'Sign in with your Google account',
      available: true
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'mdi:github',
      iconClass: 'text-white',
      description: 'Sign in with your GitHub account',
      available: true
    },
    {
      id: 'discord',
      name: 'Discord',
      icon: 'logos:discord-icon',
      description: 'Sign in with your Discord account',
      available: false
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      icon: 'mdi:twitter',
      iconClass: 'text-sky-400',
      description: 'Sign in with your Twitter account',
      available: false
    }
  ]

  const handleSocialLogin = (providerId: string) => {
    // TODO: Implement social authentication
    console.log('Social login with:', providerId)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {t('hud.AuthPage.Social.title', 'Social Authentication')}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {t(
              'hud.AuthPage.Social.intro',
              'Choose your preferred authentication provider'
            )}
          </p>
        </motion.div>

        <div className="space-y-3">
          {socialProviders.map((provider, index) => (
            <motion.button
              key={provider.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() =>
                provider.available && handleSocialLogin(provider.id)
              }
              disabled={!provider.available}
              className={`group flex w-full items-center gap-4 rounded-xl border p-4 transition-all ${
                provider.available
                  ? 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  : 'cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50'
              }`}
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-black/20">
                <Icon
                  icon={provider.icon}
                  className={`text-2xl ${provider.iconClass || ''}`}
                />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-200">
                    {provider.name}
                  </span>
                  {!provider.available && (
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                      {t('hud.AuthPage.Social.comingSoon', 'Coming Soon')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{provider.description}</p>
              </div>
              {provider.available && (
                <Icon
                  icon="mdi:chevron-right"
                  className="text-xl text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-slate-300"
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900/50 px-2 text-slate-500 backdrop-blur-sm">
              {t('hud.AuthPage.Social.orUseEmail', 'Or use email')}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/auth/login')}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            {t('hud.AuthPage.Social.loginButton', 'Login')}
          </button>
          <button
            onClick={() => navigate('/auth/register')}
            className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 active:scale-95"
          >
            {t('hud.AuthPage.Social.registerButton', 'Register')}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
