import { Outlet } from 'react-router-dom'

export default function SettingsPage() {
  return (
    <div className="flex size-full flex-row">
      <Outlet />
    </div>
  )
}
