import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

export default function AnalyticsPage() {
  return (
    <div className="flex size-full items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'circOut' }}
        className="glass-panel flex max-w-md flex-col items-center border-slate-200 bg-white/50 p-12 text-center dark:border-white/10 dark:bg-slate-950/40"
      >
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-inner ring-1 ring-black/5 dark:ring-white/10">
          <Icon
            icon="mdi:chart-timeline-variant"
            className="size-10 text-indigo-600 dark:text-indigo-400"
          />
        </div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Analytics Dashboard
        </h2>

        <p className="mb-8 text-slate-500 dark:text-slate-400">
          We are currently building a powerful analytics suite to help you track
          your countdown engagement. Stay tuned!
        </p>

        <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-400">
          <Icon icon="mdi:cone" className="size-4" />
          <span>Work in Progress</span>
        </div>
      </motion.div>
    </div>
  )
}
