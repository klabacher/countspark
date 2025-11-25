import { Icon } from '@iconify/react'
import RandomImageContainer from 'Components/Utils/RandomImage'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateSettings } from 'Providers/ReduxProvider/LogicStore'
import { LogicStoreSettingsType } from 'Types/LogicStoreType'

function EditContainer({
  title,
  isNew = false
}: {
  title: string
  isNew?: boolean
}) {
  const dispatch = useDispatch()
  const settings = useSelector((state: RootState) => state.counter.Settings)

  const handleUpdate = (
    section: keyof LogicStoreSettingsType,
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    const currentSection = settings[section]
    const newData = { ...currentSection, [key]: value }
    dispatch(updateSettings({ section, data: newData }))
  }

  // Helper to convert timestamp to datetime-local string
  const toDateTimeLocal = (timestamp: number) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    // Adjust for timezone offset to show local time in input
    const offset = date.getTimezoneOffset() * 60000
    const localISOTime = new Date(date.getTime() - offset)
      .toISOString()
      .slice(0, 16)
    return localISOTime
  }

  // Helper to convert datetime-local string to timestamp
  const fromDateTimeLocal = (value: string) => {
    return new Date(value).getTime()
  }

  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-hidden border-r border-slate-200 bg-slate-50 shadow-2xl dark:border-white/10 dark:bg-slate-900">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        {/* Overlay escuro para garantir leitura em qualquer imagem */}
        <div className="absolute inset-0 size-full bg-white/90 backdrop-blur-sm dark:bg-slate-950/80 dark:mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20" />
      </div>

      <div className="relative z-10 flex h-full flex-col p-6">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-900/20">
            <Icon
              className="text-xl text-white"
              icon={isNew ? 'mdi:plus' : 'mdi:pencil'}
            />
          </div>
          <div>
            <h1 className="font-mono text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isNew ? 'Configure your new counter' : 'Update project settings'}
            </p>
          </div>
        </div>

        <div className="scrollbar-custom flex-1 overflow-y-auto pr-2">
          <div className="space-y-6">
            {/* Texts Configuration */}
            <div className="rounded-xl border border-slate-200 bg-white/50 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Icon icon="mdi:text" className="text-emerald-500" />
                Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Title
                  </label>
                  <input
                    type="text"
                    value={settings.Texts.title}
                    onChange={(e) =>
                      handleUpdate('Texts', 'title', e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Description
                  </label>
                  <textarea
                    value={settings.Texts.description}
                    onChange={(e) =>
                      handleUpdate('Texts', 'description', e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Call to Action
                  </label>
                  <input
                    type="text"
                    value={settings.Texts.calltoAction}
                    onChange={(e) =>
                      handleUpdate('Texts', 'calltoAction', e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Timing Configuration */}
            <div className="rounded-xl border border-slate-200 bg-white/50 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Icon
                  icon="mdi:clock-outline"
                  className="text-blue-500 dark:text-blue-400"
                />
                Timing Configuration
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    value={toDateTimeLocal(settings.Timing.endDate)}
                    onChange={(e) =>
                      handleUpdate(
                        'Timing',
                        'endDate',
                        fromDateTimeLocal(e.target.value)
                      )
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={settings.Settings.timezone}
                    onChange={(e) =>
                      handleUpdate('Settings', 'timezone', e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Visual Settings */}
            <div className="rounded-xl border border-slate-200 bg-white/50 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <Icon
                  icon="mdi:palette-outline"
                  className="text-purple-500 dark:text-purple-400"
                />
                Visual Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                    Background Image URL
                  </label>
                  <input
                    type="text"
                    value={settings.Styles.backgroundImageUrl}
                    onChange={(e) =>
                      handleUpdate(
                        'Styles',
                        'backgroundImageUrl',
                        e.target.value
                      )
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                      Digit Separator
                    </label>
                    <input
                      type="text"
                      value={settings.Settings.digitSeparator}
                      onChange={(e) =>
                        handleUpdate(
                          'Settings',
                          'digitSeparator',
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      checked={settings.Settings.showSeconds}
                      onChange={(e) =>
                        handleUpdate(
                          'Settings',
                          'showSeconds',
                          e.target.checked
                        )
                      }
                      className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-white/10 dark:bg-black/20"
                    />
                    <label className="text-sm text-slate-700 dark:text-slate-300">
                      Show Seconds
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditNewProject() {
  return <EditContainer title="New Project" isNew={true} />
}

function EditOldProject() {
  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )
  return (
    <EditContainer title={`Edit Project #${String(selecionado).slice(0, 8)}`} />
  )
}

export default function EditTabContainer({
  action
}: {
  action: 'NewItem' | 'EditItem'
}) {
  return action === 'NewItem' ? <EditNewProject /> : <EditOldProject />
}
