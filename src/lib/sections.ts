/** The page's sections, in document order. Single source of truth for:
 *  - the nav links, desktop and mobile (Nav.tsx)
 *  - the numbered eyebrow on each heading (SectionHeading.tsx)
 *  - the ids the globe companion watches (geoStops.ts)
 *
 *  App.tsx renders the components in this same order; that one is still by
 *  hand, but a section missing from this list loses its nav entry and its
 *  number, so the two can't drift silently for long.
 *
 *  Inserting an id here renumbers every section after it automatically. */
export const SECTION_IDS = [
  'about',
  'projects',
  'experience',
  'publications',
  'skills',
  'education',
  'contact',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

/** Position in SECTION_IDS as the zero-padded label the headings show:
 *  'about' -> '01', 'projects' -> '02', and so on. */
export function sectionNumber(id: SectionId): string {
  return String(SECTION_IDS.indexOf(id) + 1).padStart(2, '0')
}
