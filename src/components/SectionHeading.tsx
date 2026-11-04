import { sectionNumber, type SectionId } from '../lib/sections'

interface SectionHeadingProps {
  /** The section's own id. The number shown comes from its position in
   *  SECTION_IDS, so inserting a section never leaves stale numbers behind. */
  id: SectionId
  title: string
}

export function SectionHeading({ id, title }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="rounded bg-accent-soft px-2 py-0.5 font-mono text-sm text-accent-strong">
        {sectionNumber(id)}
      </span>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  )
}
