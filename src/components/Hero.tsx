import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import PixelDrift from '@/components/originkit/ui/pixeldrift'
import IsometricButton from '@/components/originkit/ui/keycap-button'

const NAME_COLORS = ['#2f7d6b', '#1f5a4c', '#7fa89c']
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

  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-32 lg:pt-40">
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

        <motion.div variants={item} className="h-20 w-full max-w-md sm:h-24" aria-hidden="true">
          <PixelDrift
            text={t('hero.shortName')}
            colors={NAME_COLORS}
            mode="onEnter"
            replay={false}
            position="middle"
            particleSize={10}
            particleCount={40}
            mouseEnabled
            mouseRadius={45}
            mouseForce={20}
            fontSize={56}
            autoFit
            transition={NAME_TRANSITION}
            style={NAME_STYLE}
          />
        </motion.div>

        <motion.p variants={item} className="text-lg font-medium text-accent-strong sm:text-xl">
          {t('hero.role')}
        </motion.p>
        <motion.p variants={item} className="max-w-md text-base leading-relaxed text-ink-muted">
          {t('hero.tagline')}
        </motion.p>

        <motion.div variants={item} className="mt-3 flex flex-wrap items-center gap-4">
          <IsometricButton
            label={t('hero.ctaContact')}
            link="#contact"
            rounded={100}
            padding="18px 30px"
            colors={{ fill: '#17211c', textColor: '#dcede7', hoverTextColor: '#ffffff' }}
            prism={{ color: '#2f7d6b', float: 7, hoverFloat: 5, intensity: 100, thickness: 12 }}
          />
          <IsometricButton
            label={t('hero.ctaResume')}
            link="/resume.pdf"
            newTab
            rounded={100}
            padding="18px 30px"
            colors={{ fill: '#17211c', textColor: '#9ba89f', hoverTextColor: '#ffffff' }}
            prism={{ color: '#57685f', float: 7, hoverFloat: 5, intensity: 80, thickness: 12 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
