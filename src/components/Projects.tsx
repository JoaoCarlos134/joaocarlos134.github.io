import { useTranslation } from 'react-i18next'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'
import { PROJECTS, type ProjectConfig } from '../lib/projects'

function ProjectCard({ project }: { project: ProjectConfig }) {
  const { t } = useTranslation()
  const name = t(`projects.items.${project.id}.name`)
  const highlights = t(`projects.items.${project.id}.highlights`, {
    returnObjects: true,
  }) as string[]

  return (
    <article className="rounded-xl border border-border bg-surface px-5 py-5 transition-colors hover:border-accent">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 font-mono text-xs text-accent-strong hover:underline"
        >
          {t('projects.viewSource')}
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Rendered only when a real screenshot has been committed — see the
          `image` note in lib/projects.ts. */}
      {project.image && (
        <img
          src={project.image}
          alt={t('projects.screenshotAlt', { name })}
          loading="lazy"
          className="mt-4 w-full rounded-lg border border-border object-cover"
        />
      )}

      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {t(`projects.items.${project.id}.hook`)}
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {highlights.map((highlight, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
            {/* Echoes the timeline node in Experience, at bullet scale. */}
            <span
              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent-strong"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  )
}

export function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="py-24">
      <ScrollReveal>
        <SectionHeading id="projects" title={t('projects.heading')} />
      </ScrollReveal>

      <div className="mt-10 flex flex-col gap-4">
        {PROJECTS.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.05}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
