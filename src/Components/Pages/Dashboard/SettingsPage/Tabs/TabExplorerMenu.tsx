import RandomImageContainer from 'Components/Utils/RandomImage'
import { Icon } from '@iconify/react'
import { AppDispatch, RootState } from 'Providers/ReduxProvider/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedItemId } from 'Providers/ReduxProvider/DOMState'
import { updateProjectList } from 'Providers/ReduxProvider/LogicStore'
import LogicProvider from 'Providers/LogicProvider'
import { ProjectItem } from 'Types/LogicStoreType'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import type { LogicStoreSettingsType } from 'Types/LogicStoreType'

type ProjectData = {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  settings: LogicStoreSettingsType
  title: string
  status: StatusType
  date_update: string
}

// Tipos mantidos para consistência
type StatusType = 'online' | 'offline' | 'busy'

// ... imports

// ... Types ...

const StatusDot = ({ status }: { status: StatusType }) => {
  const colors = {
    online: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    offline: 'bg-slate-500',
    busy: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
  }
  return (
    <span
      className={`size-2 rounded-full ${colors[status]} ring-1 ring-black/20`}
    />
  )
}

const ActionButton = ({ icon, projId }: { icon: string; projId: string }) => {
  const dispatch = useDispatch<AppDispatch>()

  const selectProject = (id: string | null) => {
    dispatch(updateSelectedItemId(id))
  }
  return (
    <button
      onClick={() => {
        selectProject(projId)
      }}
      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
    >
      <Icon icon={icon} className="size-4" />
    </button>
  )
}

const Item = ({ title, id, status, date_update }: ProjectItem) => {
  return (
    <div className="group flex cursor-pointer items-center justify-between border-b border-slate-200 bg-transparent px-6 py-4 transition-colors hover:bg-slate-100 dark:border-white/5 dark:hover:bg-white/[0.03]">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs font-medium text-slate-500">
          #{String(id).slice(0, 8)}
        </span>

        <div className="flex flex-col">
          <h4 className="text-sm font-medium text-slate-700 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white">
            {title}
          </h4>
          <div className="mt-1 flex items-center gap-2">
            <StatusDot status={status} />
            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              {status}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-600">
              •
            </span>
            <span className="text-[10px] text-slate-500">
              Atualizado: {format(new Date(date_update), 'dd/MM/yyyy HH:mm')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <ActionButton projId={id} icon="mdi:select" />
        <ActionButton projId={id} icon="mdi:dots-vertical" />
      </div>
    </div>
  )
}

const ItemList = ({ items }: { items: ProjectItem[] }) => {
  return (
    <div className="flex size-full flex-col bg-transparent">
      <div className="border-b border-slate-200 bg-white/50 px-6 py-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
        <h3 className="flex items-baseline gap-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Projetos
          <span className="text-sm font-normal text-slate-500">
            - Visão geral dos seus contadores
          </span>
        </h3>
      </div>

      <div className="scrollbar-custom flex-1 overflow-y-auto">
        <div className="flex flex-col divide-y divide-slate-200 dark:divide-white/5">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white/50 px-6 py-4 dark:border-white/10 dark:bg-white/[0.02]">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-xs font-medium text-slate-500 transition-colors hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white">
          <Icon icon="mdi:plus" />
          Criar Novo Projeto
        </button>
      </div>
    </div>
  )
}

function SideA() {
  const dispatch = useDispatch<AppDispatch>()
  const projectList = useSelector(
    (state: RootState) => state.counter.ProjectList
  )
  const user = useSelector((state: RootState) => state.dom.AuthInfo.user)

  useEffect(() => {
    const fetchProjects = async () => {
      if (user?.id) {
        const result = await LogicProvider.listCounters(user.id)
        if (result.success) {
          dispatch(updateProjectList(result.data))
        }
      }
    }
    fetchProjects()
  }, [dispatch, user])

  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-hidden border-r border-slate-200 bg-slate-50 shadow-2xl dark:border-white/10 dark:bg-slate-900">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        {/* Overlay escuro para garantir leitura em qualquer imagem */}
        <div className="absolute inset-0 size-full bg-white/90 backdrop-blur-sm dark:bg-slate-950/80 dark:mix-blend-multiply" />
      </div>

      <div className="relative z-10 flex size-full items-center justify-center p-4 sm:p-6">
        <div className="flex h-full max-h-[90%] w-4/5 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/50 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl transition-all dark:border-white/10 dark:bg-slate-950/40 dark:ring-black/50">
          <ItemList items={projectList} />
        </div>
      </div>
    </div>
  )
}

function SideB() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [projectdata, setProjectData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(false)

  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )

  const selectProject = (id: string | null) => {
    dispatch(updateSelectedItemId(id))
  }
  const goToEditTab = () => {
    navigate('/dashboard/settings/edit')
  }
  const goToNewTab = () => {
    navigate('/dashboard/settings/new')
  }

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (selecionado) {
        setLoading(true)
        const result = await LogicProvider.fetchCounterData(selecionado)
        if (result.success) {
          console.log('Fetched project data:', result.data)
          setProjectData(result.data)
        }
        setLoading(false)
      } else {
        setProjectData(null)
      }
    }
    fetchProjectDetails()
  }, [selecionado])

  // Helper for detail rows
  const DetailRow = ({
    label,
    value
  }: {
    label: string
    value: React.ReactNode
  }) => (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className="text-right font-medium text-slate-900 dark:text-slate-200">
        {value}
      </span>
    </div>
  )

  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Background Noise & Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20"></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-100/50 to-slate-200/90 dark:from-slate-900/50 dark:to-slate-950/90"></div>

      <div className="z-10 flex h-full flex-col">
        {selecionado ? (
          <>
            {/* Header Fixed */}
            <div className="flex-none p-8 pb-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
              >
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-600 dark:text-blue-400">
                      #{String(selecionado).slice(0, 8)}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {projectdata?.settings.Texts?.title || 'Sem Título'}
                  </h2>
                </div>
                <button
                  onClick={() => selectProject(null)}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <Icon icon="mdi:close" className="text-xl" />
                </button>
              </motion.div>
            </div>

            {/* Scrollable Content */}
            <div className="scrollbar-custom flex-1 overflow-y-auto px-8 py-2">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <Icon
                    icon="mdi:loading"
                    className="animate-spin text-3xl text-blue-500"
                  />
                </div>
              ) : projectdata ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8 pb-8"
                >
                  {/* Description */}
                  {projectdata.settings.Texts.description && (
                    <div className="leading-relaxed text-slate-600 dark:text-slate-400">
                      {projectdata.settings.Texts.description}
                    </div>
                  )}

                  <hr className="border-slate-200 dark:border-white/10" />

                  {/* Timing Section */}
                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                      <Icon
                        icon="mdi:clock-outline"
                        className="text-blue-500 dark:text-blue-400"
                      />
                      Cronograma
                    </h3>
                    <div className="rounded-xl border border-slate-200 bg-white/50 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                      <DetailRow
                        label="Início"
                        value={
                          projectdata.settings.Timing.startDate
                            ? format(
                                new Date(projectdata.settings.Timing.startDate),
                                'dd/MM/yyyy HH:mm'
                              )
                            : '-'
                        }
                      />
                      <div className="my-1 h-px bg-slate-200 dark:bg-white/5" />
                      <DetailRow
                        label="Término"
                        value={
                          projectdata.settings.Timing.endDate
                            ? format(
                                new Date(projectdata.settings.Timing.endDate),
                                'dd/MM/yyyy HH:mm'
                              )
                            : '-'
                        }
                      />
                      <div className="my-1 h-px bg-slate-200 dark:bg-white/5" />
                      <DetailRow
                        label="Fuso Horário"
                        value={projectdata.settings.Settings.timezone}
                      />
                    </div>
                  </section>

                  {/* Visuals Section */}
                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                      <Icon
                        icon="mdi:palette-outline"
                        className="text-purple-500 dark:text-purple-400"
                      />
                      Aparência
                    </h3>
                    <div className="space-y-4 rounded-xl border border-slate-200 bg-white/50 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                      <DetailRow
                        label="Tema"
                        value={projectdata.settings.Styles.selectedTheme}
                      />

                      {projectdata.settings.Styles.backgroundImageUrl && (
                        <div className="mt-4">
                          <span className="mb-2 block text-xs text-slate-500 dark:text-slate-400">
                            Imagem de Fundo
                          </span>
                          <div className="relative h-32 w-full overflow-hidden rounded-lg border border-slate-200 dark:border-white/10">
                            <img
                              src={
                                projectdata.settings.Styles.backgroundImageUrl
                              }
                              alt="Background"
                              className="size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Settings Section */}
                  <section>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
                      <Icon
                        icon="mdi:cog-outline"
                        className="text-emerald-500 dark:text-emerald-400"
                      />
                      Configurações
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-slate-200 bg-white/50 p-3 text-center dark:border-white/10 dark:bg-white/5">
                        <span className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                          Dígitos
                        </span>
                        <span className="font-medium capitalize text-slate-900 dark:text-slate-200">
                          {projectdata.settings.Settings.digitsShown}
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white/50 p-3 text-center dark:border-white/10 dark:bg-white/5">
                        <span className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
                          Segundos
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-200">
                          {projectdata.settings.Settings.showSeconds
                            ? 'Visíveis'
                            : 'Ocultos'}
                        </span>
                      </div>
                    </div>
                  </section>
                </motion.div>
              ) : (
                <div className="mt-20 text-center text-slate-500">
                  Não foi possível carregar os dados do projeto.
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex-none border-t border-slate-200 bg-white/50 p-6 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/50">
              <div className="flex gap-3">
                <button
                  onClick={() => goToEditTab()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/30"
                >
                  <Icon icon="mdi:pencil" />
                  Editar Projeto
                </button>
                <button
                  onClick={() => navigate(`/pub/${selecionado}`)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/50 px-4 py-3 font-medium text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  title="Visualizar"
                >
                  <Icon icon="mdi:eye" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 rounded-full bg-slate-100 p-6 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10">
              <Icon
                icon="mdi:cursor-default-click-outline"
                className="text-4xl text-slate-400 dark:text-slate-500"
              />
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
              Nenhum Projeto Selecionado
            </h2>
            <p className="mx-auto mb-8 max-w-xs text-slate-500 dark:text-slate-400">
              Selecione um projeto na lista ao lado para ver os detalhes ou crie
              um novo contador.
            </p>
            <button
              onClick={() => goToNewTab()}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <Icon icon="mdi:plus" />
              Criar Novo Projeto
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default function TabExplorerContainer() {
  return (
    <div className="size-full overflow-hidden bg-slate-50 p-0 dark:bg-black">
      <div className="flex size-full overflow-hidden rounded-sm bg-transparent shadow-inner">
        <SideA />
        <SideB />
      </div>
    </div>
  )
}
