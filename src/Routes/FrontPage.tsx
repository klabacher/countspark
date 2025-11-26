import HomePage, {
  LogoImageContainer
} from 'Components/Pages/FrontPage/HomePage'
import Auth from 'Components/Pages/FrontPage/Auth'
import { useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import OverlayContainer from 'Components/Utils/OverlayContainer'

function App() {
  const FrontPageState = useSelector(
    (state: RootState) => state.dom.PageInfo.FrontPage.state
  )

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="flex h-screen w-screen">
        <OverlayContainer />
        {/* When */}
        {FrontPageState === 'home' ? (
          <>
            <LogoImageContainer context="frontpage" />
            <HomePage />
          </>
        ) : (
          <>
            <Auth />
            <LogoImageContainer context="auth" />
          </>
        )}
      </div>
    </div>
  )
}

export default App
