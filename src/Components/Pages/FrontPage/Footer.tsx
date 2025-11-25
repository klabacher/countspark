import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mb-4 mt-auto text-center text-sm text-slate-500">
      <div>{t('hud.texts.footer')}</div>
      <div className="mt-2 flex items-center justify-center space-x-4">
        <a
          href="https://github.com/klabacher"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 transition-colors hover:text-indigo-400"
        >
          GitHub
        </a>
        <span className="text-slate-600">|</span>
        <a
          href="https://klabacher.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 transition-colors hover:text-indigo-400"
        >
          klabacher.github.io
        </a>
      </div>
    </footer>
  )
}
