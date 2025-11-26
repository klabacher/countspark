import { RootState } from 'Providers/ReduxProvider/Store'
import LoginPage from './Auth/Login'
import RegisterPage from './Auth/Register'
import ForgotPassword from './Auth/ForgotPassword'
import HeaderMenu from './Auth/Header'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

export default function Auth() {
  const FrontPageState = useSelector(
    (state: RootState) => state.dom.PageInfo.FrontPage.state
  )
  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center p-4">
      <HeaderMenu />
      <div className="mt-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={FrontPageState}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {FrontPageState === 'auth:login' ? (
              <LoginPage />
            ) : FrontPageState === 'auth:register' ? (
              <RegisterPage />
            ) : FrontPageState === 'auth:forgot-password' ? (
              <ForgotPassword />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
