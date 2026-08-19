export interface GeoCoord {
  lat: number
  lng: number
}

// Real places this CV's content actually touches — not decoration.
export const CURITIBA: GeoCoord = { lat: -25.4284, lng: -49.2733 } // UFPR + LACTEC
export const BASEL: GeoCoord = { lat: 47.5596, lng: 7.5886 } // Energies (MDPI)
export const RIO: GeoCoord = { lat: -22.9068, lng: -43.1729 } // INPI

/** Section id -> where the globe should face while that section is in view.
 *  Sections not listed here leave the globe wherever it last landed. */
export const GEO_STOP_COORDS: Record<string, GeoCoord> = {
  hero: CURITIBA,
  experience: CURITIBA,
  'publications-articles': BASEL,
  'publications-patents': RIO,
  education: CURITIBA,
}

// Plotted once at mount and never change — see GlobeCompanion for why.
export const GEO_MARKERS: GeoCoord[] = [CURITIBA, BASEL, RIO]

/** Every id the companion watches, in document order — includes ids with no
 *  stop (the globe just idles through those) and 'contact', which hides it. */
export const GEO_WATCH_IDS = [
  'hero',
  'about',
  'experience',
  'publications-articles',
  'publications-patents',
  'skills',
  'education',
  'contact',
]

export const GEO_HIDE_ID = 'contact'
