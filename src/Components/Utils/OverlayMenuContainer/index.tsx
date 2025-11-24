import { AppDispatch } from 'Providers/ReduxProvider/Store'
import { updateOverlayVisible } from 'Providers/ReduxProvider/DOMState'
import { useDispatch } from 'react-redux'
import { Icon } from '@iconify/react'

import TimezoneSelect from './OptionsSelect'
import HourPickerCustom from './HourPickerCustom'
import { useTranslation } from 'react-i18next'
import ImageUrlPicker from './ImageUrlPicker'

function Menu({ handleOverlayToggle }: { handleOverlayToggle: () => void }) {
  const { t } = useTranslation()
  return (
    <div className="flex h-12 w-full flex-row items-center justify-between">
      <h2 className="mb-4 text-2xl font-bold text-sky-500">
        {t('hud.settings.title')}
      </h2>
      <button
        onClick={() => handleOverlayToggle()}
        className="rounded bg-transparent px-2 py-1 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        <Icon
          icon="material-symbols:close-small-rounded"
          width="24"
          height="24"
        />
      </button>
    </div>
  )
}

function Container({
  handleOverlayToggle
}: {
  handleOverlayToggle: () => void
}) {
  return (
    <div className="flex size-full flex-col items-stretch gap-4">
      <Menu handleOverlayToggle={handleOverlayToggle} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <HourPickerCustom handleOverlayToggle={handleOverlayToggle} />
        </div>
        <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <TimezoneSelect />
        </div>
        <div className="col-span-2 rounded-sm border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <ImageUrlPicker handleOverlayToggle={handleOverlayToggle} />
        </div>
        {/* <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <TimezoneSelect />
        </div> */}
      </div>
    </div>
  )
}

export default function OverlayMenuContainer() {
  const dispatch = useDispatch<AppDispatch>()

  const handleOverlayToggle = () => {
    // Dispatch action to toggle overlay state
    dispatch(updateOverlayVisible())
  }

  return (
    <div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <div className="flex w-full max-w-3xl flex-col rounded-sm border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur-md dark:bg-slate-950/95">
          <Container handleOverlayToggle={handleOverlayToggle} />
        </div>
      </div>
    </div>
  )
}
