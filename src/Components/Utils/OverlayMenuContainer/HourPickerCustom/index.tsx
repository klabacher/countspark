/// https://icon-sets.iconify.design/material-symbols/?icon-filter=menu
import { Icon } from '@iconify/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'Providers/ReduxProvider/Store'
import { updateSettings } from 'Providers/ReduxProvider/LogicStore'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { formatForDatetimeLocal, zonedDatetimeLocalToUtcMs } from 'Utils'
import { LogicStoreSettingsType } from 'Types/LogicStoreType'

export default function HourPickerCustom({
  handleOverlayToggle
}: {
  handleOverlayToggle?: () => void
  projectdata?: LogicStoreSettingsType | null
  setTimeFC?: React.Dispatch<
    React.SetStateAction<LogicStoreSettingsType | null>
  >
}) {
  const dispatch = useDispatch<AppDispatch>()
  const { Timing, Settings } = useSelector(
    (state: RootState) => state.counter.Settings
  )
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  // Update input value when endDate or timezone changes
  useEffect(() => {
    setInputValue(formatForDatetimeLocal(Timing.endDate, Settings.timezone))
  }, [Timing.endDate, Settings.timezone])

  const handleTiming = (date: string) => {
    const utcMs = zonedDatetimeLocalToUtcMs(date, Settings.timezone)
    dispatch(
      updateSettings({ section: 'Timing', data: { ...Timing, endDate: utcMs } })
    )
  }

  return (
    <div className="flex size-full flex-col gap-2">
      <label
        htmlFor="inputField"
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {t('hud.picker.endDateLabel')}
      </label>
      <input
        type="datetime-local"
        id="inputField"
        className="w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-indigo-500 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        value={inputValue}
        min={formatForDatetimeLocal(new Date(), Settings.timezone)}
        onChange={(el) => {
          setInputValue(el.target.value)
        }}
      />
      <button
        className="mt-4 flex border-spacing-1 flex-row items-center justify-center rounded bg-blue-500 px-4 py-2 font-mono text-white hover:bg-blue-600"
        onClick={() => {
          handleTiming(inputValue)
          if (handleOverlayToggle) {
            handleOverlayToggle()
          }
        }}
        type="submit"
      >
        <p>{t('hud.buttons.apply')}</p>
        <Icon
          icon="material-symbols:subdirectory-arrow-left"
          width="24"
          height="24"
        />
      </button>
      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {t('hud.picker.timezoneDisplay', { tz: Settings.timezone })}
      </div>
    </div>
  )
}
