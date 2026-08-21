import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const SECTION_IDS = ['about', 'experience', 'publications', 'skills', 'education', 'contact']
// 'hero' is watched but has no nav link, so sitting at the top of the page
// highlights nothing — it used to default to 'about', claiming you were in a
// section you hadn't reached yet.
const WATCHED_IDS = ['hero', ...SECTION_IDS]

export function Nav() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the viewport's middle rather than whatever
        // happens to sit first in the callback batch: when a fast scroll puts
        // two short sections in the band at once, entry order is not document
        // order, so the highlight could land on either one.
        const mid = window.innerHeight / 2
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - mid) -
              Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - mid),
          )[0]
        if (best) setActive(best.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    WATCHED_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const setLang = (lng: 'en' | 'pt') => i18n.changeLanguage(lng)

  // Tinted rather than the page's own near-white, which left the bar reading
  // as part of the page instead of sitting on top of it.
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-accent/15 bg-accent-soft/90 backdrop-blur-md">
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
                // The old active pill was bg-accent-soft, which is now the bar
                // itself — it would have disappeared against it.
                active === id
                  ? 'bg-surface text-accent-strong shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-accent/25 p-0.5 font-mono text-xs">
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
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full border border-accent/25 p-2 text-ink-muted hover:text-ink md:hidden"
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
            className="overflow-hidden border-t border-accent/15 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {SECTION_IDS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-surface hover:text-ink"
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
