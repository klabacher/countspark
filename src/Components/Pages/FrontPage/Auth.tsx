import HeaderMenu from './Auth/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect } from 'react'

// Route order for directional animations within auth flow
const AUTH_ROUTE_ORDER = [
  '/auth/login',
  '/auth/register',
  '/auth/register/activate',
  '/auth/social',
  '/auth/forgot',
  '/auth/steps'
]

function getAuthRouteIndex(pathname: string): number {
  const exactIndex = AUTH_ROUTE_ORDER.indexOf(pathname)
  if (exactIndex !== -1) return exactIndex
  // Default to login position for unknown auth routes
  return 0
}

export default function Auth() {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  // Calculate direction based on route order
  const currentIndex = getAuthRouteIndex(location.pathname)
  const prevIndex = getAuthRouteIndex(prevPathRef.current)
  const direction = currentIndex >= prevIndex ? 1 : -1

  useEffect(() => {
    prevPathRef.current = location.pathname
  }, [location.pathname])

  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center p-4">
      <HeaderMenu />
      <div className="mt-6 w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
