import { useEffect, useState } from 'react'
import { GEO_HIDE_ID, GEO_STOP_COORDS, GEO_WATCH_IDS } from '../lib/geoStops'

const STOP_IDS = GEO_WATCH_IDS.filter((id) => id !== GEO_HIDE_ID)

export function useGeoCompanion() {
  const [activeStopId, setActiveStopId] = useState<string>('hero')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Which stop is "active" is decided by whichever content section is
    // nearest the vertical center of the viewport.
    const stopEls = STOP_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    )
    const stopObserver = new IntersectionObserver(
      (entries) => {
        // Nearest the viewport's middle, not first-in-batch: entry order is
        // not document order, so a fast scroll past two short sections could
        // otherwise land the globe on the wrong one.
        const mid = window.innerHeight / 2
        const hit = entries
          .filter((e) => e.isIntersecting && GEO_STOP_COORDS[e.target.id])
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - mid) -
              Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - mid),
          )[0]
        if (hit) setActiveStopId(hit.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    stopEls.forEach((el) => stopObserver.observe(el))

    // Whether the companion shows at all is separate and independent: hide
    // as soon as any part of Contact is on screen. A center-band check like
    // the one above would need enough page below Contact to ever center it
    // — Contact is the last section, with only a short footer after it, so
    // that band is sometimes never reachable at the true bottom of the page.
    let hideObserver: IntersectionObserver | undefined
    const hideEl = document.getElementById(GEO_HIDE_ID)
    if (hideEl) {
      hideObserver = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0 },
      )
      hideObserver.observe(hideEl)
    }

    return () => {
      stopObserver.disconnect()
      hideObserver?.disconnect()
    }
  }, [])

  return { activeStopId, coord: GEO_STOP_COORDS[activeStopId], visible }
}
