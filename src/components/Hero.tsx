import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import PixelDrift from '@/components/originkit/ui/pixeldrift'
import IsometricButton from '@/components/originkit/ui/keycap-button'
import { KEYCAP_PRIMARY, KEYCAP_SECONDARY } from '../lib/keycap'

// One entry, not three: the component buckets particles by colour, so a single
// value paints every pixel the same. This is the page's ink rather than pure
// #000 — the same near-black every other line of text on the site uses.
const NAME_COLORS = ['#17211c']
const NAME_TRANSITION = { type: 'tween' as const, duration: 1.2, ease: 'easeOut' }
const NAME_STYLE = { width: '100%', height: '100%', minWidth: 0, minHeight: 0 }

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

  // No overflow-hidden on the section: the keycap buttons throw a glow ~50px
  // past their own box, and the first one sits flush against this column's
  // left edge — clipping here sliced that shadow off in mid-air. Bleed is
  // caught at the viewport instead (see `overflow-x: clip` on body).
  return (
    <section id="hero" className="relative pb-20 pt-32 lg:pt-40">
      <motion.div
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : 'show'}
        className="flex max-w-2xl flex-col items-start gap-5 text-left"
      >
        {/* PixelDrift renders the name as canvas particles, invisible to
            screen readers — this carries the real heading semantics. */}
        <h1 className="sr-only">{t('hero.shortName')}</h1>

        <motion.p variants={item} className="text-lg font-medium italic text-accent-strong sm:text-xl">
          {t('hero.greeting')}
        </motion.p>

        {/* autoFit scales the text to ~92% of this box, so the box is what
            sets the visual size — fontSize is only the upper bound it may
            grow to. */}
        <motion.div variants={item} className="h-28 w-full max-w-xl sm:h-32 lg:h-36" aria-hidden="true">
          <PixelDrift
            text={t('hero.shortName')}
            colors={NAME_COLORS}
            mode="onEnter"
            replay={false}
            position="middle"
            // Sampling gap is round(150 / particleCount) px, floored at 2, and
            // particleCount is clamped to 50 — so 50 is the densest the
            // component allows (a 3px grid, down from 4px at the old 40).
            particleSize={9}
            particleCount={50}
            mouseEnabled
            mouseRadius={45}
            mouseForce={20}
            fontSize={96}
            autoFit
            transition={NAME_TRANSITION}
            style={NAME_STYLE}
          />
        </motion.div>

        {/* balance: the wider globe column narrowed this one enough that the
            role wraps, and it was orphaning the last word onto its own line. */}
        <motion.p
          variants={item}
          className="text-balance text-lg font-medium text-accent-strong sm:text-xl"
        >
          {t('hero.role')}
        </motion.p>
        <motion.p variants={item} className="max-w-md text-base leading-relaxed text-ink-muted">
          {t('hero.tagline')}
        </motion.p>

        {/* Wide gap on purpose: each cap throws a glow well past its own box,
            so a tight gap made two neighbouring glows bleed into each other. */}
        <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-8">
          <IsometricButton {...KEYCAP_PRIMARY} label={t('hero.ctaContact')} link="#contact" />
          <IsometricButton {...KEYCAP_SECONDARY} label={t('hero.ctaResume')} link="/resume.pdf" newTab />
        </motion.div>
      </motion.div>
    </section>
  )
}
