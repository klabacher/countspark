import HomePage, {
  LogoImageContainer
} from 'Components/Pages/FrontPage/HomePage'
import Auth from 'Components/Pages/FrontPage/Auth'
import { useLocation } from 'react-router-dom'
import OverlayContainer from 'Components/Utils/OverlayContainer'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()
  const isAuthRoute = location.pathname.startsWith('/auth')

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="flex h-screen w-screen">
        <OverlayContainer />
        <AnimatePresence mode="wait" initial={false}>
          {!isAuthRoute ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex size-full"
            >
              <LogoImageContainer context="frontpage" />
              <HomePage />
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex size-full"
            >
              <Auth />
              <LogoImageContainer context="auth" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
