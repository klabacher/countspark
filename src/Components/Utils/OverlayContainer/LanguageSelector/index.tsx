// TODO: improve styling and accessibility
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import {
  getCurrentLanguage,
  changeLanguage,
  getAvailableLanguages
} from 'Providers/InternationalizationProvider'

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch'
}

function Menu({ onClose }: { onClose: () => void }) {
  const [languages, setLanguages] = useState<string[]>([])
  const [language, setLanguage] = useState<string>(getCurrentLanguage())
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setLanguages(getAvailableLanguages())
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={t('hud.languageSelect.label')}
      className="mt-2 w-56 rounded-sm border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon icon="material-symbols:translate" width="20" height="20" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-100">
            {t('hud.languageSelect.label')}
          </span>
        </div>
        <button
          aria-label={t('common.close') || 'Close'}
          onClick={onClose}
          className="text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
        >
          <Icon icon="ic:round-close" width="18" height="18" />
        </button>
      </div>

      <label htmlFor="languageSelect" className="sr-only">
        {t('hud.languageSelect.label')}
      </label>

      <select
        id="languageSelect"
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value)
          changeLanguage(e.target.value)
        }}
        className="w-full rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {LANGUAGE_NAMES[lang] ?? lang.toUpperCase()}
          </option>
        ))}
      </select>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        {t('hud.languageSelect.hint') ?? 'Escolha seu idioma.'}
      </div>
    </div>
  )
}

// Transparent Floating Language Selector Component
export default function LangSelector() {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="flex flex-col items-end">
      <button
        ref={btnRef}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('hud.languageSelect.open') ?? 'Open language selector'}
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white/90 px-3 py-2 shadow-md backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-white dark:border-white/10 dark:bg-slate-900/90 dark:hover:bg-slate-900"
      >
        <Icon
          className="text-zinc-300"
          icon="material-symbols:translate"
          width="20"
          height="20"
        />
        {open ? (
          <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-100 sm:inline">
            {t('hud.languageSelect.label')}
          </span>
        ) : null}
        <Icon
          icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          width="18"
          height="18"
          className="text-gray-400"
        />
      </button>

      {open ? <Menu onClose={() => setOpen(false)} /> : null}
    </div>
  )
}
