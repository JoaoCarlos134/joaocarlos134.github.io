import { useEffect, useState } from 'react'
import { GEO_HIDE_ID, GEO_STOP_COORDS, GEO_WATCH_IDS } from '../lib/geoStops'

export function useGeoCompanion() {
  const [activeStopId, setActiveStopId] = useState<string>('hero')
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const els = GEO_WATCH_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (!hit) return
        const id = hit.target.id
        setVisible(id !== GEO_HIDE_ID)
        if (GEO_STOP_COORDS[id]) setActiveStopId(id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return { activeStopId, coord: GEO_STOP_COORDS[activeStopId], visible }
}
