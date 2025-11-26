// Change id or to number or uuid based on your auth system
export type UserProfile = {
  id: string
  email: string | undefined
  name: string
  role: 'admin' | 'user' | 'guest'
}

type AuthInfo = {
  isAuthenticated: boolean
  user: UserProfile | null
  token: string | null
  loading: boolean
  error: string | null
}

type DashboardPage = {
  selectedItemId?: string | null
}

type PageInfo = {
  DashboardPage: DashboardPage
}

type DomStateType = {
  theme: 'dark' | 'light'
  overlayVisible: boolean
  AuthInfo: AuthInfo
  PageInfo: PageInfo
}

export default DomStateType
