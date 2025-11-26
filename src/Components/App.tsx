import store, { RootState } from 'Providers/ReduxProvider/Store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { StrictMode, useEffect, useRef, useState } from 'react'
import supabase from 'Providers/SupabaseProvider'
import { authSuccess, logout } from 'Providers/ReduxProvider/DOMState'
import Loading from 'Components/Utils/Loading'
import { UserProfile } from 'Types/DOMStateType'

// Routes
import FrontPage from 'Routes/FrontPage'
import PublicApp from 'Routes/Service'
import DashboardLayout from 'Routes/Dashboard'
import NotFound from 'Routes/404'

// Auth Pages
import LoginPage from 'Components/Pages/FrontPage/Auth/Login'
import RegisterPage from 'Components/Pages/FrontPage/Auth/Register'
import ForgotPassword from 'Components/Pages/FrontPage/Auth/ForgotPassword'
import ActivatePage from 'Components/Pages/FrontPage/Auth/Activate'
import SocialAuthPage from 'Components/Pages/FrontPage/Auth/Social'
import ResetStepsPage from 'Components/Pages/FrontPage/Auth/ResetSteps'

// Dashboard Pages
import AnalyticsPage from 'Components/Pages/Dashboard/AnalyticsPage'
import PreviewPage from 'Components/Pages/Dashboard/PreviewPage'
import SettingsPage from 'Components/Pages/Dashboard/SettingsPage'
import TabExplorerMenu from 'Components/Pages/Dashboard/SettingsPage/Tabs/TabExplorerMenu'
import TabItemManagement from 'Components/Pages/Dashboard/SettingsPage/Tabs/TabItemManagement'

// Route order for directional animations
const ROUTE_ORDER = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/register/activate',
  '/auth/social',
  '/auth/forgot',
  '/auth/steps',
  '/dashboard',
  '/dashboard/settings',
  '/dashboard/settings/new',
  '/dashboard/settings/edit',
  '/dashboard/preview',
  '/dashboard/analytics'
]

function getRouteIndex(pathname: string): number {
  // Exact match first
  const exactIndex = ROUTE_ORDER.indexOf(pathname)
  if (exactIndex !== -1) return exactIndex

  // Check if it's an auth route
  if (pathname.startsWith('/auth')) {
    return ROUTE_ORDER.indexOf('/auth/login')
  }

  // Check if it's a dashboard route
  if (pathname.startsWith('/dashboard')) {
    return ROUTE_ORDER.indexOf('/dashboard')
  }

  return -1
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const isLoggedIn = useSelector(
    (state: RootState) => state.dom.AuthInfo.isAuthenticated
  )
  // Preserve the intended destination for redirect after login
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  )
}

// Animated page wrapper with directional transitions
function AnimatedPage({
  children,
  direction
}: {
  children: React.ReactNode
  direction: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      className="size-full"
    >
      {children}
    </motion.div>
  )
}

function RoutesContainer() {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  // Calculate direction based on route order
  const currentIndex = getRouteIndex(location.pathname)
  const prevIndex = getRouteIndex(prevPathRef.current)
  const direction = currentIndex >= prevIndex ? 1 : -1

  useEffect(() => {
    prevPathRef.current = location.pathname
  }, [location.pathname])

  // Determine if we're in auth flow for layout key
  const isAuthRoute = location.pathname.startsWith('/auth')
  const layoutKey = isAuthRoute ? 'auth' : location.pathname

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={layoutKey}>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <AnimatedPage direction={direction}>
              <FrontPage />
            </AnimatedPage>
          }
        />

        {/* Auth Routes - nested under FrontPage layout */}
        <Route
          path="/auth"
          element={
            <AnimatedPage direction={direction}>
              <FrontPage />
            </AnimatedPage>
          }
        >
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="register/activate" element={<ActivatePage />} />
          <Route path="social" element={<SocialAuthPage />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="steps" element={<ResetStepsPage />} />
        </Route>

        {/* Public Project View */}
        <Route path="/pub/:id" element={<PublicApp />} />

        {/* Dashboard - Protected with nested routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={<Navigate to="/dashboard/settings" replace />}
          />
          <Route path="settings" element={<SettingsPage />}>
            <Route index element={<TabExplorerMenu />} />
            <Route
              path="new"
              element={<TabItemManagement action="NewItem" />}
            />
            <Route
              path="edit"
              element={<TabItemManagement action="EditItem" />}
            />
          </Route>
          <Route path="preview" element={<PreviewPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function ThemeHandler() {
  const theme = useSelector((state: RootState) => state.dom.theme)

  useEffect(() => {
    console.log('Theme changed to:', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return null
}

function AppContainer() {
  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeHandler />
        <div className="fixed inset-0 -z-10 bg-slate-50 transition-colors duration-500 dark:bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50 dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay brightness-100 contrast-150 dark:opacity-20" />
        </div>
        <BrowserRouter basename="/countspark">
          <SessionHandler>
            <div className="min-h-screen text-slate-900 selection:bg-indigo-500/30 dark:text-slate-200">
              <RoutesContainer />
            </div>
          </SessionHandler>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="!bg-slate-900/90 !backdrop-blur-md !border !border-white/10 !text-slate-200 !rounded-xl !shadow-xl"
          />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

function SessionHandler({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession()

        if (session?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileData) {
            const userProfile: UserProfile = {
              id: session.user.id,
              email: session.user.email || '',
              name: profileData.name || '',
              role: (profileData.role as 'user' | 'admin' | 'guest') || 'user'
            }
            dispatch(
              authSuccess({
                user: userProfile,
                token: session.access_token
              })
            )
          }
        }
      } catch (error) {
        console.error('Session initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeSession()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Logic handled by initializeSession usually, but good for re-auth
        // We can duplicate logic or just rely on Redux state
      } else if (event === 'SIGNED_OUT') {
        dispatch(logout())
        navigate('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [dispatch, navigate])

  if (isLoading) return <Loading />

  return children
}

export default AppContainer
