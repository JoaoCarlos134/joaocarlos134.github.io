interface SectionHeadingProps {
  eyebrow: string
  title: string
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="rounded bg-accent-soft px-2 py-0.5 font-mono text-sm text-accent-strong">{eyebrow}</span>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  )
}
