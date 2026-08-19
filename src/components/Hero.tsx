import { lazy, Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import BorderOrbit from '@/components/originkit/ui/hero-18/border-orbit'
import IsometricButton from '@/components/originkit/ui/keycap-button'

// `three` is ~600KB minified — its own chunk, fetched only once the hero
// mounts, so it never blocks the initial page parse.
const Globe = lazy(() => import('@/components/originkit/ui/globe'))

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

// LACTEC / UFPR, where this résumé's research actually happens.
const CURITIBA = { lat: -25.43, lng: -49.27 }

export function Hero() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [globeReady, setGlobeReady] = useState(false)

  // Mount the WebGL globe only after first paint so it never blocks the
  // hero's own entrance animation.
  useEffect(() => {
    const id = requestAnimationFrame(() => setGlobeReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section id="hero" className="relative overflow-hidden px-5 pt-28 pb-20 lg:min-h-screen lg:pt-32">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left"
        >
          <motion.div
            variants={item}
            className="relative flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 shadow-sm"
          >
            <BorderOrbit color="#2f7d6b" arcPercent={26} speed={2.5} />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">
              {t('hero.greeting')}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t('hero.name')}
          </motion.h1>
          <motion.p variants={item} className="text-lg font-medium text-accent-strong sm:text-xl">
            {t('hero.role')}
          </motion.p>
          <motion.p variants={item} className="max-w-md text-base leading-relaxed text-ink-muted">
            {t('hero.tagline')}
          </motion.p>

          <motion.div variants={item} className="mt-3 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
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

        <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[460px]" aria-hidden="true">
          {globeReady && !reduceMotion && (
            <Suspense fallback={null}>
              <Globe
                fill="dots"
                dots={{ color: '#2f7d6b', size: 4, density: 6, allDots: false }}
                oceanColor="rgba(0,0,0,0)"
                showOutline
                outlineColor="#17211c"
                outlineWidth={1}
                showGrid
                graticuleColor="#dbe6e0"
                scale={9}
                speed={1.4}
                dragSpeed={5}
                stopOnHover
                initialLatitude={-15}
                initialLongitude={-40}
                markerConfig={{ markers: [CURITIBA], color: '#1f5a4c', size: 55 }}
              />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  )
}
