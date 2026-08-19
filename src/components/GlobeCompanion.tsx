import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import type { GlobeHandle } from '@/components/originkit/ui/globe'
import { CURITIBA, GEO_MARKERS } from '../lib/geoStops'
import { useGeoCompanion } from '../hooks/useGeoCompanion'

const Globe = lazy(() => import('@/components/originkit/ui/globe'))

// Hoisted so these keep the same reference across re-renders — both are
// effect dependencies inside globe.tsx, so a fresh object literal on every
// stop change would rebuild the whole WebGL scene each time.
const GLOBE_DOTS = { color: '#2f7d6b', size: 4, density: 6, allDots: false }
const GLOBE_MARKER_CONFIG = { markers: GEO_MARKERS, color: '#1f5a4c', size: 55 }

export function GlobeCompanion() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const { activeStopId, coord, visible } = useGeoCompanion()
  const globeRef = useRef<GlobeHandle>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Re-aim the already-live globe instead of remounting it — see the
  // `rotateTo` comment in globe.tsx for why changing initialLatitude /
  // initialLongitude as props isn't an option here.
  useEffect(() => {
    if (coord) globeRef.current?.rotateTo(coord.lat, coord.lng)
  }, [coord])

  if (reduceMotion) return null

  return (
    <motion.div
      className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-center gap-2 sm:bottom-6 sm:right-6 lg:sticky lg:bottom-auto lg:right-auto lg:top-28 lg:z-0"
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.92 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="h-36 w-36 sm:h-48 sm:w-48 lg:h-[380px] lg:w-[380px]">
        {mounted && (
          <Suspense fallback={null}>
            <Globe
              ref={globeRef}
              fill="dots"
              dots={GLOBE_DOTS}
              oceanColor="rgba(0,0,0,0)"
              showOutline
              outlineColor="#17211c"
              outlineWidth={1}
              showGrid
              graticuleColor="#dbe6e0"
              scale={9}
              // Ambient spin, always on — rotateTo layers scroll-driven
              // retargeting on top of it. No pointer interaction at all:
              // this is a passive companion, not a toy.
              speed={1.4}
              interactive={false}
              stopOnHover={false}
              // Mount-time pose only — every move after that goes through
              // rotateTo, so this must stay a constant, never `coord`.
              initialLatitude={CURITIBA.lat}
              initialLongitude={CURITIBA.lng}
              markerConfig={GLOBE_MARKER_CONFIG}
            />
          </Suspense>
        )}
      </div>

      <AnimatePresence mode="wait">
        {coord && (
          <motion.div
            key={activeStopId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="flex max-w-[13rem] flex-col items-center gap-0.5 rounded-xl border border-border bg-surface px-3 py-2 text-center shadow-sm lg:max-w-[16rem] lg:px-4 lg:py-3"
          >
            <span className="flex items-center gap-1 font-mono text-xs font-medium text-accent-strong lg:text-sm">
              <MapPin size={12} />
              {t(`geoStops.${activeStopId}.place`)}
            </span>
            <span className="text-[11px] leading-snug text-ink-muted lg:text-xs">
              {t(`geoStops.${activeStopId}.info`)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
