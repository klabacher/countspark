import HomePage from 'Components/Pages/FrontPage/HomePage'
import RandomImageContainer from 'Components/Utils/RandomImage'
import Auth from 'Components/Pages/FrontPage/Auth'
import { useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import OverlayContainer from 'Components/Utils/OverlayContainer'

function App() {
  const FrontPageState = useSelector(
    (state: RootState) => state.dom.PageInfo.FrontPage.state
  )

  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 dark:bg-slate-950">
      <div className="flex h-screen w-screen">
        <OverlayContainer />
        {/* TODO: add new sucess box for changes */}
        {FrontPageState === 'home' ? <RandomImageContainer /> : <Auth />}
        {FrontPageState === 'home' ? <HomePage /> : <RandomImageContainer />}
      </div>
    </div>
  )
}

export default App
