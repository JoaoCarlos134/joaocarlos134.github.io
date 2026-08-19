import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/3 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[110px]"
          style={{ background: 'var(--accent)' }}
        />
      </div>

      <motion.div
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'show'}
        className="flex max-w-2xl flex-col items-center gap-4"
      >
        <motion.p variants={item} className="font-mono text-sm uppercase tracking-[0.2em] text-accent-strong">
          {t('hero.greeting')}
        </motion.p>
        <motion.h1 variants={item} className="text-balance text-5xl font-bold tracking-tight sm:text-6xl">
          {t('hero.name')}
        </motion.h1>
        <motion.p variants={item} className="text-xl font-medium text-ink-muted">
          {t('hero.role')}
        </motion.p>
        <motion.p variants={item} className="max-w-lg text-base text-ink-muted">
          {t('hero.tagline')}
        </motion.p>
        <motion.div variants={item} className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-transform hover:scale-105"
          >
            {t('hero.ctaContact')}
          </a>
          <a
            href="/resume.pdf"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-strong"
          >
            {t('hero.ctaResume')}
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-8 text-ink-muted"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  )
}
