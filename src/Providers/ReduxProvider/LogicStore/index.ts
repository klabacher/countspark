import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import LogicStoreType, {
  LogicPreviewStoreType,
  LogicPreviewMinifiedStoreType,
  LogicStoreSettingsType,
  ProjectItem
} from 'Types/LogicStoreType'

// Boilerplate inicial (Valores Padrão)
// Você pode criar constantes separadas se os valores iniciais começarem a divergir
const baseValues = {
  Timing: {
    startDate: new Date('2020-01-01').getTime(),
    endDate: new Date('2026-01-01 00:00:00').getTime()
  },
  Texts: {
    title: 'Final do Ano 2025',
    description: 'Contagem regressiva para o final do ano de 2025!',
    calltoAction: 'Vamos comemorar juntos quando chegar a hora!',
    buttons: [
      {
        label: 'Vamos até lá!',
        shownOnlyWhen: 'beforeStart',
        action: 'link',
        link: null
      }
    ],
    footer: 'Feito com ❤️ por Klabacher - github.com/klabacher'
  },
  Styles: {
    selectedTheme: 'custom',
    customTheme: {
      backgroundColor: '#1e293b',
      textColor: '#e2e8f0',
      accentColor: '#3b82f6',
      buttonColor: '#2563eb',
      buttonTextColor: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      showBackgroundImage: false
    },
    backgroundImageUrl: '',
    backgroundImageOpacity: 0.2,
    backgroundImageBlur: 2
  },
  Settings: {
    showTimezone: false,
    timezone: 'America/Sao_Paulo',
    digitSeparator: ':',
    digitsShowLeadingZeros: true,
    digitsShown: 'years',
    showSeconds: true,
    animationDuration: 0
  }
}

const initialState: LogicStoreType = {
  // Aqui garantimos independência criando cópias profundas
  Production: JSON.parse(JSON.stringify(baseValues)),
  Preview: JSON.parse(JSON.stringify(baseValues)),
  PreviewMinified: JSON.parse(JSON.stringify(baseValues)),
  Settings: JSON.parse(JSON.stringify(baseValues)),
  ProjectList: []
}

// Payload Genérico para Reutilizar a Lógica dentro do Reducer
// T = O Tipo do Store (ex: LogicPreviewStoreType)
// K = As chaves desse Store (ex: 'Timing' | 'Texts')
type UpdatePayload<T, K extends keyof T> = {
  section: K
  data: T[K]
}

export const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    updateProduction(
      state: ReduxState,
      action: PayloadAction<LogicPreviewStoreType>
    ) {
      state.Production = action.payload
    },
    updatePreview<K extends keyof LogicPreviewStoreType>(
      state: ReduxState,
      action: PayloadAction<UpdatePayload<LogicPreviewStoreType, K>>
    ) {
      const { section, data } = action.payload
      state.Preview[section] = data
    },
    // Fully dump state
    updatePreviewFull(
      state: ReduxState,
      action: PayloadAction<LogicStoreType['Preview']>
    ) {
      state.Preview = action.payload
    },

    updatePreviewMinified<K extends keyof LogicPreviewMinifiedStoreType>(
      state: ReduxState,
      action: PayloadAction<UpdatePayload<LogicPreviewMinifiedStoreType, K>>
    ) {
      const { section, data } = action.payload
      state.PreviewMinified[section] = data
    },

    updateSettings<K extends keyof LogicStoreSettingsType>(
      state: ReduxState,
      action: PayloadAction<UpdatePayload<LogicStoreSettingsType, K>>
    ) {
      const { section, data } = action.payload
      state.Settings[section] = data
    },

    updateProjectList(state: ReduxState, action: PayloadAction<ProjectItem[]>) {
      state.ProjectList = action.payload
    }
  }
})

export const {
  updateProduction,
  updatePreview,
  updatePreviewFull,
  updatePreviewMinified,
  updateSettings,
  updateProjectList
} = reduxSlice.actions
export default reduxSlice.reducer

export type ReduxState = typeof initialState
