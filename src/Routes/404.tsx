import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-8 dark:from-slate-950 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'circOut' }}
        className="w-full max-w-lg space-y-6 rounded-sm border border-slate-200 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80"
      >
        <div className="flex items-center justify-center">
          <Icon
            icon="mdi:alert-circle-outline"
            className="size-16 text-red-500 dark:text-red-400"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            404
          </h1>
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Page not found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-sm border border-blue-500/20 bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-blue-700 hover:shadow-blue-500/25"
        >
          <Icon icon="mdi:arrow-left" className="size-5" />
          Go to Home
        </a>
      </motion.div>
    </main>
  )
}
