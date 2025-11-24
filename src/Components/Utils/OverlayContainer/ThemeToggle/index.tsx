import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import { toggleTheme } from 'Providers/ReduxProvider/DOMState'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state: RootState) => state.dom.theme)

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="relative flex h-9 w-16 items-center rounded-sm bg-slate-200 p-1 shadow-inner transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:bg-slate-800"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="flex size-7 items-center justify-center rounded-sm bg-white shadow-md dark:bg-slate-950"
        layout
        transition={{ ease: 'circOut', duration: 0.3 }}
        animate={{
          x: theme === 'dark' ? 28 : 0
        }}
      >
        <Icon
          icon={theme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'}
          className={`text-lg ${
            theme === 'dark' ? 'text-blue-400' : 'text-amber-500'
          }`}
        />
      </motion.div>
    </button>
  )
}
