import EditProject from './Components/EditProject'
import PreviewResults from './Components/PreviewResults'

// Add difernce between new project and edit project
export default function TabMenuContainer({
  action
}: {
  action: 'NewItem' | 'EditItem'
}) {
  if (action === 'NewItem') {
    return (
      <div className="h-screen w-screen overflow-hidden bg-black p-0">
        <div className="flex h-screen w-screen overflow-hidden rounded-sm bg-transparent shadow-inner">
          <PreviewResults />
          <EditProject action="NewItem" />
        </div>
      </div>
    )
  } else if (action === 'EditItem') {
    return (
      <div className="h-screen w-screen overflow-hidden bg-black p-0">
        <div className="flex h-screen w-screen overflow-hidden rounded-sm bg-transparent shadow-inner">
          <PreviewResults />
          <EditProject action="EditItem" />
        </div>
      </div>
    )
  } else {
    return <div>Unexpected Error</div>
  }
}
