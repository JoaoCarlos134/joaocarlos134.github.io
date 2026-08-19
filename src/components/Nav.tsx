import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const SECTION_IDS = ['about', 'experience', 'publications', 'skills', 'education', 'contact']

export function Nav() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [active, setActive] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const setLang = (lng: 'en' | 'pt') => i18n.changeLanguage(lng)

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a href="#hero" className="font-mono text-sm font-medium tracking-tight text-ink">
          {t('hero.name')}
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                active === id ? 'text-accent-strong bg-accent-soft' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-border p-0.5 font-mono text-xs">
            {(['pt', 'en'] as const).map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setLang(lng)}
                className={`rounded-full px-2 py-1 uppercase transition-colors ${
                  i18n.language.startsWith(lng) ? 'bg-accent text-accent-contrast' : 'text-ink-muted hover:text-ink'
                }`}
                aria-pressed={i18n.language.startsWith(lng)}
              >
                {lng}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-border p-2 text-ink-muted hover:text-ink"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full border border-border p-2 text-ink-muted hover:text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {SECTION_IDS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-accent-soft hover:text-ink"
                >
                  {t(`nav.${id}`)}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
