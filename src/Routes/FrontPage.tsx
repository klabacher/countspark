import HomePage from 'Components/Pages/FrontPage/HomePage'
import RandomImageContainer from 'Components/Utils/RandomImage'
import Auth from 'Components/Pages/FrontPage/Auth'
import { useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import LanguageSelector from 'Components/Utils/LanguageSelector'
// import ThemeToggle from 'Components/Utils/ThemeToggle'
// import { Navigate } from 'react-router-dom'

function App() {
  const FrontPageState = useSelector(
    (state: RootState) => state.dom.PageInfo.FrontPage.state
  )

  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 p-1 dark:bg-slate-950">
      <div className="absolute right-4 top-4 z-50 flex gap-2">
        <LanguageSelector />
        {/* Broken <ThemeToggle /> */}
      </div>
      {/* {overlay ? <OverlayMenuContainer /> : null} */}
      <div className="flex h-screen w-screen">
        {/* TODO: add new sucess box for changes */}
        {FrontPageState === 'home' ? <RandomImageContainer /> : <Auth />}
        {FrontPageState === 'home' ? <HomePage /> : <RandomImageContainer />}
      </div>
    </div>
  )
}

export default App
