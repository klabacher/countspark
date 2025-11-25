import { Icon } from '@iconify/react'
import RandomImageContainer from 'Components/Utils/RandomImage'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useSelector } from 'react-redux'

function EditContainer({
  title,
  isNew = false
}: {
  title: string
  isNew?: boolean
}) {
  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-hidden border-r border-slate-800 bg-slate-900 shadow-2xl">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        {/* Overlay escuro para garantir leitura em qualquer imagem */}
        <div className="absolute inset-0 size-full bg-slate-950/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 flex h-full flex-col p-6">
        <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex size-10 items-center justify-center rounded-sm bg-blue-600 shadow-lg shadow-blue-900/20">
            <Icon
              className="text-xl text-white"
              icon={isNew ? 'mdi:plus' : 'mdi:pencil'}
            />
          </div>
          <div>
            <h1 className="font-mono text-xl font-bold text-white">{title}</h1>
            <p className="text-xs text-slate-400">
              {isNew ? 'Configure your new counter' : 'Update project settings'}
            </p>
          </div>
        </div>

        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 flex-1 overflow-y-auto pr-2">
          <div className="space-y-6">
            {/* Placeholder for Form Sections */}
            <div className="rounded-sm border border-white/10 bg-slate-950/40 p-6 backdrop-blur-md">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
                <Icon icon="mdi:clock-outline" className="text-blue-400" />
                Timing Configuration
              </h2>
              <div className="space-y-4">
                <div className="rounded-sm border border-white/5 bg-black/20 p-4 text-center text-sm text-slate-500">
                  Form inputs will go here (Date Pickers, Timezones)
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-white/10 bg-slate-950/40 p-6 backdrop-blur-md">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
                <Icon icon="mdi:palette-outline" className="text-purple-400" />
                Visual Settings
              </h2>
              <div className="space-y-4">
                <div className="rounded-sm border border-white/5 bg-black/20 p-4 text-center text-sm text-slate-500">
                  Theme selection, Backgrounds, Fonts
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
