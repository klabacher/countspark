import { Outlet } from 'react-router-dom'
import Header from 'Components/Pages/Dashboard/Header'
import OverlayContainer from 'Components/Utils/OverlayContainer'

function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-50 p-0 dark:bg-slate-950">
      <OverlayContainer />
      <Header />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
