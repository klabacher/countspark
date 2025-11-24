import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type initialStateType from 'Types/DOMStateType'
import { UserProfile } from 'Types/DOMStateType'

// Default initial state
const initialState: initialStateType = {
  theme: 'dark',
  overlayVisible: false,
  AuthInfo: {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
  },
  PageInfo: {
    FrontPage: {
      state: 'home'
    },
    DashboardPage: {
      state: 'settings',
      SettingsTab: 'TabExplorerMenu',
      selectedItemId: null
    }
  }
}

export const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    // Definir os reducers aqui
    updateOverlayVisible(state) {
      state.overlayVisible = !state.overlayVisible
    },
    updateFrontPageState(state, action) {
      state.PageInfo.FrontPage = action.payload
    },
    updateDashboardPageState(state, action) {
      state.PageInfo.DashboardPage.state = action.payload.state
    },
    updateSettingsTabState(state, action) {
      state.PageInfo.DashboardPage.SettingsTab = action.payload
    },
    // Settings - TabExplorer selected item ID
    updateSelectedItemId(state, action) {
      state.PageInfo.DashboardPage.selectedItemId = action.payload
    },
    // Auth reducers
    authStart(state) {
      state.AuthInfo.loading = true
      state.AuthInfo.error = null
    },
    authSuccess(
      state,
      action: PayloadAction<{ user: UserProfile; token: string }>
    ) {
      state.AuthInfo.isAuthenticated = true
      state.AuthInfo.user = action.payload.user
      state.AuthInfo.token = action.payload.token
      state.AuthInfo.loading = false
      state.AuthInfo.error = null
    },
    authFail(state, action: PayloadAction<string>) {
      state.AuthInfo.loading = false
      state.AuthInfo.error = action.payload
    },
    logout(state) {
      state.AuthInfo = initialState.AuthInfo
    },
    // Theme reducer
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    }
  }
})

export const {
  updateOverlayVisible,
  updateFrontPageState,
  authStart,
  authSuccess,
  authFail,
  logout,
  updateDashboardPageState,
  updateSettingsTabState,
  updateSelectedItemId,
  toggleTheme
} = reduxSlice.actions
export default reduxSlice.reducer

export type ReduxState = typeof initialState
