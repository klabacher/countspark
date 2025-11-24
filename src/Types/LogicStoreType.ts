// src/types/LogicStoreType.ts

export type Styles = {
  selectedTheme: string
  customTheme?: {
    backgroundColor: string
    textColor: string
    accentColor: string
    buttonColor: string
    buttonTextColor: string
    fontFamily: string
    showBackgroundImage: boolean
  }
  backgroundImageUrl: string
  backgroundImageOpacity: number
  backgroundImageBlur: number
}

export type Timing = {
  startDate: number
  endDate: number
}

export type DigitsShown =
  | 'years'
  | 'months'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'

export type SettingsInfo = {
  showTimezone: boolean
  timezone: string
  digitSeparator: string
  digitsShowLeadingZeros: boolean
  digitsShown: DigitsShown
  showSeconds: boolean
  animationDuration: number
}

export type ButtonsText = {
  label: string
  action: string
  shownOnlyWhen: 'beforeStart' | 'afterEnd' | 'always'
  link: string | null
}

export type Texts = {
  title: string
  description: string
  calltoAction: string
  buttons: ButtonsText[]
  footer: string
}

export type ProjectItem = {
  id: string
  title: string
  status: 'online' | 'offline' | 'busy'
  date_update: string
  date_created: string
}

export type LogicPreviewStoreType = {
  Timing: Timing
  Texts: Texts
  Styles: Styles
  Settings: SettingsInfo
}

export type LogicPreviewMinifiedStoreType = {
  Timing: Timing
  Texts: Texts
  Styles: Styles
  Settings: SettingsInfo
}

export type LogicStoreSettingsType = {
  Timing: Timing
  Texts: Texts
  Styles: Styles
  Settings: SettingsInfo
}

type LogicStoreType = {
  Production: LogicPreviewStoreType
  Preview: LogicPreviewStoreType
  PreviewMinified: LogicPreviewMinifiedStoreType
  Settings: LogicStoreSettingsType
  ProjectList: ProjectItem[]
}

export default LogicStoreType
