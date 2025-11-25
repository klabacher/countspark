import CounterContainer from 'Components/Utils/Counter'
import OverlayMenuContainer from 'Components/Utils/OverlayMenuContainer'
import OverlayButtonContainer from 'Components/Utils/OverlayButton'
import { AppDispatch, RootState } from 'Providers/ReduxProvider/Store'
import { updateOverlayVisible } from 'Providers/ReduxProvider/DOMState'
import { updateProduction } from 'Providers/ReduxProvider/LogicStore'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import RandomImageContainer from 'Components/Utils/RandomImage'
import { useEffect } from 'react'
import LogicProvider from 'Providers/LogicProvider'

// TODO: add error handling and loading states
function App() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const overlay = useSelector((state: RootState) => state.dom.overlayVisible)

  // Push Data to redux Publication State
  useEffect(() => {
    // id valid case
    async function pushDataToRedux(id: string) {
      // push info from id
      const data = await LogicProvider.fetchCounterData(id)
      // set redux state
      if (data.success && data.data) {
        console.log('Data fetched for LogicStore:', data.data)
        dispatch(updateProduction(data.data.settings))
      } else {
        navigate(`/`)
      }
    }

    if (id && id.length > 0) {
      // push info from id
      pushDataToRedux(id)
    } else {
      navigate(`/`)
    }
  })

  const handleOverlayToggle = () => {
    // Dispatch action to toggle overlay state
    dispatch(updateOverlayVisible())
  }

  // id not valid case
  if (!id || id.length === 0) {
    navigate(`/`)
  } else {
    return (
      <div className="h-screen w-screen overflow-hidden bg-slate-50 p-1 dark:bg-slate-950">
        {overlay ? <OverlayMenuContainer /> : null}
        <div className="flex h-screen w-screen">
          <RandomImageContainer />
          <CounterContainer type="production" />
          <OverlayButtonContainer onClick={() => handleOverlayToggle()} />
        </div>
      </div>
    )
  }
}

export default App
