import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppDispatch, RootState } from 'Providers/ReduxProvider/Store'
import { updateSettings } from 'Providers/ReduxProvider/LogicStore'
import { useSelector } from 'react-redux'
import {
  getAvailableLanguages,
  getCurrentLanguage,
  changeLanguage
} from 'Providers/InternationalizationProvider'

export default function TimezoneSelect() {
  const dispatch = useDispatch<AppDispatch>()
  const storeSettings = useSelector(
    (state: RootState) => state.counter.Settings
  )
  const { t } = useTranslation()
  const [zones, setZones] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [language, setLanguage] = useState<string>(getCurrentLanguage())

  useEffect(() => {
    const fallback: string[] = [
      'UTC',
      'America/Sao_Paulo',
      'America/New_York',
      'America/Los_Angeles',
      'Europe/London',
      'Europe/Paris',
      'Asia/Tokyo',
      'Asia/Shanghai',
      'Australia/Sydney'
    ]
    setLanguages(getAvailableLanguages())

    try {
      // supportedValuesOf may not exist in older runtimes
      const intlWithSupported = Intl as unknown as {
        supportedValuesOf?: (arg: 'timeZone') => string[]
      }
      const supported = intlWithSupported.supportedValuesOf
        ? intlWithSupported.supportedValuesOf('timeZone')
        : null
      if (Array.isArray(supported) && supported.length > 0) {
        setZones(supported.slice().sort())
        return
      }
    } catch (e) {
      setZones(fallback)
    }
  }, [])

  const handleSettingsTimezone = (timezone: string) => {
    dispatch(
      updateSettings({
        section: 'Settings',
        data: {
          ...storeSettings.Settings,
          timezone
        }
      })
    )
  }
  const handleSettingsShowSeconds = (showSeconds: boolean) => {
    dispatch(
      updateSettings({
        section: 'Settings',
        data: {
          ...storeSettings.Settings,
          showSeconds
        }
      })
    )
  }

  return (
    <div className="flex size-full flex-col gap-2">
      <label
        htmlFor="timezoneSelect"
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {t('hud.timezoneSelect.label')}
      </label>
      <select
        id="timezoneSelect"
        className="w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500 focus:border-indigo-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        value={storeSettings.Settings.timezone}
        onChange={(el) => {
          handleSettingsTimezone(el.target.value)
        }}
      >
        {zones.map((tz: string) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
      <div className="m-1 flex flex-row items-center justify-center">
        <label
          htmlFor="secondsCheckbox"
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Show Seconds:
        </label>
        <input
          type="checkbox"
          name="secondsCheckbox"
          id="secondsCheckbox"
          className="m-2"
          checked={storeSettings.Settings.showSeconds}
          onChange={(e) => handleSettingsShowSeconds(e.target.checked)}
        />
      </div>
      <div className="m-1 flex flex-row items-center justify-center">
        <label
          htmlFor="timezoneSelect"
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {t('hud.languageSelect.label')}
        </label>
        <select
          id="languageSelect"
          className="w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500 focus:border-indigo-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          value={language}
          onChange={(el) => {
            setLanguage(el.target.value)
            changeLanguage(el.target.value)
          }}
        >
          {languages.map((lang: string) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
