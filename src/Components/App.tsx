import store, { RootState } from 'Providers/ReduxProvider/Store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { StrictMode, useEffect, useState } from 'react'
import supabase from 'Providers/SupabaseProvider'
import { authSuccess, logout } from 'Providers/ReduxProvider/DOMState'
import Loading from 'Components/Utils/Loading'
import { UserProfile } from 'Types/DOMStateType'
// import ThemeToggle from 'Components/Utils/ThemeToggle'

// FrontPage and Login are the same
import FrontPage from 'Routes/FrontPage'
// App to show for public
import PublicApp from 'Routes/Service'
// Home for private logged users - Dashboard
import Dashboard from 'Routes/Dashboard'
import NotFound from 'Routes/404'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.dom.AuthInfo.isAuthenticated
  )
  return isLoggedIn ? children : <Navigate to="/" />
}

function PublicRoute({ children }: { children: JSX.Element }) {
  return children
}
// TODO: Fully review all the routes and structure of pages/tabs for better DX
// add option for easy path for projects, instead of an uid keeping it only for development purposes
function RoutesContainer() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/auth/:mode" element={<FrontPage />} />
      <Route
        path="/pub/:id"
        element={
          <PublicRoute>
            <PublicApp />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
