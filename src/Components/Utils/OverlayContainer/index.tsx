import LangSelector from './LanguageSelector'
import ThemeToggle from './ThemeToggle'

// Simple container for full screen overlays apears over everything else on private routes | make another one specific for public routes and their configurations
export default function OverlayContainer() {
  return (
    // If white theme -> aplly dark colors and vice versa for better visibility
    <div className="fixed bottom-4 left-4 z-50 flex flex-row items-end gap-3">
      <LangSelector />
      <ThemeToggle />
    </div>
  )
}
