import RandomImageContainer from 'Components/Utils/RandomImage'
import Store, { RootState } from 'Providers/ReduxProvider/Store'
import { updateDashboardPageState } from 'Providers/ReduxProvider/DOMState'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'

function MinifiedPreview() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-full max-w-xs rounded-sm border border-white/10 bg-slate-950/50 p-6 text-center backdrop-blur-md">
        <div className="mb-2 font-mono text-4xl font-bold text-white">
          00:00:00
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400">
          Preview Mode
        </div>
      </div>
    </div>
  )
}

export default function PreviewResults() {
  const dispatch = Store.dispatch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )
  const gotoPreview = () => {
    dispatch(
      updateDashboardPageState({
        state: 'preview'
      })
    )
  }
  return (
    <div className="relative flex h-full w-1/2 flex-col border-r border-slate-800 bg-slate-900 shadow-2xl">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        <div className="absolute inset-0 size-full bg-slate-950/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="z-10 flex size-full flex-col items-center justify-center">
        <MinifiedPreview />

        <button
          onClick={() => gotoPreview()}
          className="group relative flex items-center gap-2 rounded-sm border border-white/20 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20"
        >
          <Icon icon="mdi:fullscreen" className="text-xl" />
          <span>Full Screen Preview</span>
          <div className="absolute -inset-1 rounded-sm bg-white/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
        </button>
      </div>
    </div>
  )
}
