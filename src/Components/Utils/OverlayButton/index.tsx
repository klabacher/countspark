/// https://icon-sets.iconify.design/material-symbols/?icon-filter=menu
import { Icon } from '@iconify/react'

export default function OverlayButtonContainer({
  onClick
}: {
  onClick: () => void
}) {
  return (
    <button
      onClick={() => onClick()}
      className="absolute bottom-4 right-4 rounded-sm border border-blue-500/20 bg-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-blue-700 hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
    </button>
  )
}
