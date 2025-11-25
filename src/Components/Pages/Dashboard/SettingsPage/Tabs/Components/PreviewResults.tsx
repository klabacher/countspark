import RandomImageContainer from 'Components/Utils/RandomImage'
import Store, { RootState } from 'Providers/ReduxProvider/Store'
import { updateDashboardPageState } from 'Providers/ReduxProvider/DOMState'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'

function MinifiedPreview() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white/50 p-6 text-center shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-slate-950/50">
        <div className="mb-2 font-mono text-4xl font-bold text-slate-900 dark:text-white">
          00:00:00
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
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
    <div className="relative flex h-full w-1/2 flex-col border-r border-slate-200 bg-slate-50 shadow-2xl dark:border-white/10 dark:bg-slate-900">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        <div className="absolute inset-0 size-full bg-white/90 backdrop-blur-sm dark:bg-slate-950/80 dark:mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20" />
      </div>

      <div className="z-10 flex size-full flex-col items-center justify-center">
        <MinifiedPreview />

        <button
          onClick={() => gotoPreview()}
          className="group relative flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-6 py-3 font-medium text-slate-900 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-lg dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/20"
        >
          <Icon icon="mdi:fullscreen" className="text-xl" />
          <span>Full Screen Preview</span>
          <div className="absolute -inset-1 rounded-lg bg-blue-500/20 opacity-0 blur transition-opacity group-hover:opacity-100 dark:bg-white/20" />
        </button>
      </div>
    </div>
  )
}
