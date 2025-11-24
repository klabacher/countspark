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
    <div className="flex h-full flex-row">
      <RandomImageContainer />
      <CounterContainer type="preview" />
    </div>
  )
}
