import { RootState } from 'Providers/ReduxProvider/Store'
import { useSelector } from 'react-redux'
// import Status from 'components/Pages/Dashboard/SettingsPage/Status'

import TabExplorerMenu from './Tabs/TabExplorerMenu'
import TabItemManagement from './Tabs/TabItemManagement'

export default function DashboardMenu() {
  const tabSelected = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.SettingsTab
  )
  return (
    <>
      <div className="flex size-full flex-row">
        {/* TODO: add new sucess box for changes */}
        {tabSelected === 'TabExplorerMenu' && <TabExplorerMenu />}
        {tabSelected === 'TabCreateItem' && (
          <TabItemManagement action="NewItem" />
        )}
        {tabSelected === 'TabEditItem' && (
          <TabItemManagement action="EditItem" />
        )}
      </div>
    </>
  )
}
