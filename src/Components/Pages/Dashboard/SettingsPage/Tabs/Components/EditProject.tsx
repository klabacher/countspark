import { Icon } from '@iconify/react'
import RandomImageContainer from 'Components/Utils/RandomImage'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useSelector } from 'react-redux'

function EditNewProject() {
  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-auto border-r border-slate-800 shadow-2xl">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        {/* Overlay escuro para garantir leitura em qualquer imagem */}
        <div className="absolute inset-0 size-full bg-slate-950/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 flex h-1/3 w-full flex-col p-4">
        <div className="mb-4 flex flex-row gap-x-2 text-center ">
          <Icon className="align-baseline text-white" icon="mdi:pencil" />
          <h1 className="indent-3 font-mono text-2xl font-bold text-white">
            Novo Projeto
          </h1>
        </div>
        <div className="flex size-full flex-col overflow-hidden rounded-sm border border-white/10 bg-slate-950/20 shadow-2xl ring-1 ring-black/50 backdrop-blur-xl transition-all">
          <div>Editar Horario</div>
          <div className="flex flex-row">
            <div>
              <h2>Editar Horario</h2>
              <p>Data deve ser em formato válido</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex h-2/3 w-full items-center justify-center p-4">
        <div className="flex size-full flex-col overflow-hidden rounded-sm border border-white/10 bg-slate-950/20 shadow-2xl ring-1 ring-black/50 backdrop-blur-xl transition-all"></div>
      </div>
    </div>
  )
}

function EditOldProject() {
  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )
  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-hidden border-r border-slate-800 shadow-2xl">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        {/* Overlay escuro para garantir leitura em qualquer imagem */}
        <div className="absolute inset-0 size-full bg-slate-950/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 flex h-1/3 w-full flex-col p-4">
        <div className="mb-4 flex flex-row gap-x-2 text-center ">
          <Icon className="align-baseline text-white" icon="mdi:pencil" />
          <h1 className="indent-3 font-mono text-2xl font-bold text-white">
            Editar Projeto {selecionado}
          </h1>
        </div>
        <div className="flex size-full flex-col overflow-hidden rounded-sm border border-white/10 bg-slate-950/20 shadow-2xl ring-1 ring-black/50 backdrop-blur-xl transition-all">
          <div>Editar Horario</div>
          <div className="flex flex-row">
            <div>
              <h2>Editar Horario</h2>
              <p>Data deve ser em formato válido</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex h-2/3 w-full items-center justify-center p-4">
        <div className="flex size-full flex-col overflow-hidden rounded-sm border border-white/10 bg-slate-950/20 shadow-2xl ring-1 ring-black/50 backdrop-blur-xl transition-all"></div>
      </div>
    </div>
  )
}

export default function EditTabContainer({
  action
}: {
  action: 'NewItem' | 'EditItem'
}) {
  return action === 'NewItem' ? <EditNewProject /> : <EditOldProject />
}
