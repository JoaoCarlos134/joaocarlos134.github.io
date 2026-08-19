import { useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons'

interface ProjectCardProps {
  name: string
  description: string
  tags: string[]
  repo: string
  demo: string
}

export function ProjectCard({ name, description, tags, repo, demo }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6"
      style={{
        background: spot.active
          ? `radial-gradient(320px circle at ${spot.x}% ${spot.y}%, var(--accent-soft), var(--surface) 65%)`
          : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex shrink-0 gap-2 text-ink-muted">
          <a href={repo} aria-label={`${name} repository`} className="transition-colors hover:text-accent-strong">
            <GithubIcon size={17} />
          </a>
          <a href={demo} aria-label={`${name} live demo`} className="transition-colors hover:text-accent-strong">
            <ExternalLink size={17} />
          </a>
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs text-accent-strong">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
