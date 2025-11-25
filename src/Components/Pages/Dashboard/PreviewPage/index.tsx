import { useEffect } from 'react'
import CounterContainer from 'Components/Utils/Counter'
import { updatePreviewFull } from 'Providers/ReduxProvider/LogicStore'
import { AppDispatch, RootState } from 'Providers/ReduxProvider/Store'
import { useDispatch, useSelector } from 'react-redux'
import RandomImageContainer from 'Components/Utils/RandomImage'

// Loads real data for a production counter view
export default function CountDownContainer() {
  const dispatch = useDispatch<AppDispatch>()
  // Add logic to get data and load to Redux store
  // Fetch from Redux Settings Store and dump to Preview Store
  const settingsData = useSelector((state: RootState) => state.counter.Settings)
  useEffect(() => {
    // Dump to Preview Store
    dispatch(
      updatePreviewFull({
        ...settingsData
      })
    )
  }, [settingsData, dispatch])
  return (
    <div className="relative flex size-full flex-row overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <RandomImageContainer />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 flex size-full items-center justify-center">
        <CounterContainer type="preview" />
      </div>
    </div>
  )
}
