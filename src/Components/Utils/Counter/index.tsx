import { useEffect, useState } from 'react'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useSelector } from 'react-redux'
import { utcDiffMs } from 'Utils'
import { useTranslation } from 'react-i18next'
import i18n from 'Providers/InternationalizationProvider'
import { LogicPreviewStoreType } from 'Types/LogicStoreType'

const Divisor = ({ el }: { el: string }): JSX.Element => (
  <div className="text-2xl text-white">{el}</div>
)
const Numeros = ({ valor, label }: { valor: number; label: string }) => {
  return (
    <div>
      <p className="font-mono text-sm text-white">{label}</p>
      <div className="font-mono text-7xl text-blue-600 dark:text-sky-400">
        {valor.toString().padStart(2, '0')}
      </div>
    </div>
  )
}

const Segundos = ({ valor }: { valor: number }) => {
  return (
    <div className="font-mono text-5xl text-white dark:text-sky-400">
      {valor.toString().padStart(2, '0')}
      <span className="font-mono text-2xl text-white">s</span>
    </div>
  )
}

export function Buttons({
  currentData
}: {
  currentData: LogicPreviewStoreType
}) {
  const buttons = currentData.Texts.buttons

  return (
    <div className="mb-4 flex flex-row justify-center space-x-4">
      {buttons.map((button, index) => {
        if (button.shownOnlyWhen === 'always') {
          return (
            <a
              key={index}
              href={button.link ? button.link : '#'}
              className="rounded-sm border border-blue-500/20 bg-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-blue-700 hover:shadow-blue-500/25"
            >
              {button.label}
            </a>
          )
        }
        // Additional conditions for shownOnlyWhen can be implemented here
        return null
      })}
    </div>
  )
}

function CountSpark({ currentData }: { currentData: LogicPreviewStoreType }) {
  // Todo: add timezone show/hide logic
  const { showTimezone, timezone } = currentData.Settings

  // Controle de exibição dos elementos
  // TODO: setup states to control which time units to show
  const [anos, setAnos] = useState<boolean>(false)
  const [meses, setMeses] = useState<boolean>(false)
  const [dias, setDias] = useState<boolean>(false)
  // const [horas, setHoras] = useState<boolean>(false)
  // const [minutos, setMinutos] = useState<boolean>(false)

  // Controle dos minutos e segundos
  const [anoAtual, setAnoAtual] = useState<number>(0)
  const [mesAtual, setMesAtual] = useState<number>(0)
  const [diaAtual, setDiaAtual] = useState<number>(0)
  const [horaAtual, setHoraAtual] = useState<number>(0)
  const [minutoAtual, setMinutoAtual] = useState<number>(0)
  const [segundoAtual, setSegundoAtual] = useState<number>(0)

  useEffect(() => {
    // Todo implement StartDate Logic - lower priority
    // const startDate = new Date(currentData.Timing.startDate)

    // Atualiza o CountSpark a cada segundo
    const interval = setInterval(() => {
      const difference = utcDiffMs(currentData.Timing.endDate)
      const segundosTotais = Math.floor(difference / 1000)
      const minutosTotais = Math.floor(segundosTotais / 60)
      const horasTotais = Math.floor(minutosTotais / 60)
      const diasTotais = Math.floor(horasTotais / 24)
      const mesesTotais = Math.floor(diasTotais / 30)
      const anosTotais = Math.floor(mesesTotais / 12)
      if (anosTotais > 0) {
        setAnos(true)
        setAnoAtual(anosTotais)
      } else {
        setAnos(false)
      }
      if (mesesTotais > 0) {
        setMeses(true)
        setMesAtual(mesesTotais % 12)
      } else {
        setMeses(false)
      }
      if (diasTotais > 0) {
        setDias(true)
        setDiaAtual(diasTotais % 30)
      } else {
        setDias(true)
        setDiaAtual(0)
      }
      if (horasTotais > 0) {
        // setHoras(true)
        setHoraAtual(horasTotais % 24)
      } else {
        // setHoras(true)
        setHoraAtual(0)
      }
      if (minutosTotais > 0) {
        // setMinutos(true)
        setMinutoAtual(minutosTotais % 60)
      } else {
        // setMinutos(true)
        setMinutoAtual(0)
      }
      if (segundosTotais > 0) {
        setSegundoAtual(segundosTotais % 60)
      } else {
        setSegundoAtual(0)
      }
      //TODO: do logic for when seconds reach zero -> Party | seconds = false then reach party and stop counter when minuto 0
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData.Timing.endDate, timezone])
  // Lógica do CountSpark aqui
  const { t } = useTranslation('', { i18n })

  return (
    <div className="mt-8 flex flex-row items-center">
      {anos ? (
        <>
          <Numeros label={t('hud.counter.years')} valor={anoAtual} />{' '}
          <Divisor el={currentData.Settings.digitSeparator} />
        </>
      ) : null}
      {meses ? (
        <>
          <Numeros label={t('hud.counter.months')} valor={mesAtual} />{' '}
          <Divisor el={currentData.Settings.digitSeparator} />
        </>
      ) : null}
      {dias ? (
        <>
          <Numeros label={t('hud.counter.days')} valor={diaAtual} />{' '}
          <Divisor el={currentData.Settings.digitSeparator} />
        </>
      ) : null}
      {/* {horas ? (  Always show hours*/}
      <>
        <Numeros label={t('hud.counter.hours')} valor={horaAtual} />{' '}
        <Divisor el={currentData.Settings.digitSeparator} />
      </>
      {/* ) : null} */}
      {/* {minutos ? ( always show minutes*/}
      <>
        <Numeros label={t('hud.counter.minutes')} valor={minutoAtual} />{' '}
      </>
      {/* ) : null} */}
      {currentData.Settings.showSeconds ? (
        <>
          <Divisor el={currentData.Settings.digitSeparator} />
          <Segundos valor={segundoAtual} />
        </>
      ) : null}
      {showTimezone ? (
        <p>{t('hud.picker.timezoneDisplay', { tz: timezone })}</p>
      ) : null}
    </div>
  )
}

function Counter({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type
}: {
  type: 'production' | 'preview' | 'previewMinified'
}) {
  const currentData = useSelector(
    (state: RootState) => state.counter.Production
  )

  return (
    <div className="flex h-full flex-col place-content-center items-center font-mono text-white">
      <div className="text-center">
        {currentData.Texts.title ? (
          <h1 className="mb-4 text-7xl">{currentData.Texts.title}</h1>
        ) : null}
        {currentData.Texts.description ? (
          <h2 className="mb-4 text-4xl">{currentData.Texts.description}</h2>
        ) : null}
        {currentData.Texts.calltoAction ? (
          <p className="mb-4 text-sm">{currentData.Texts.calltoAction}</p>
        ) : null}
        <Buttons currentData={currentData} />
      </div>
      <CountSpark currentData={currentData} />
    </div>
  )
}

export default function CounterContainer({
  type
}: {
  type: 'production' | 'preview' | 'previewMinified'
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <div className="flex h-full w-1/2 flex-col bg-slate-800 p-2">
      <Counter type={type} />
      <footer className="mt-auto text-center text-xl text-gray-400">
        <div>{t('hud.texts.footer')}</div>
        <div className="mt-1 flex items-center justify-center space-x-3">
          <a
            href="https://github.com/klabacher"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            GitHub
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="https://klabacher.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            klabacher.github.io
          </a>
        </div>
      </footer>
    </div>
  )
}
