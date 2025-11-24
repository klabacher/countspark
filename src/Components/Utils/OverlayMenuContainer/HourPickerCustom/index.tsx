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
        className="text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {t('hud.picker.endDateLabel')}
      </label>
      <input
        type="datetime-local"
        id="inputField"
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-sky-500 placeholder:text-gray-400 focus:border-sky-500 focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
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
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {t('hud.picker.timezoneDisplay', { tz: Settings.timezone })}
      </div>
    </div>
  )
}
