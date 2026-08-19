import { useTranslation } from 'react-i18next'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'
import { ProjectCard } from './ProjectCard'

interface ProjectItem {
  name: string
  description: string
  tags: string[]
  repo: string
  demo: string
}

export function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true }) as ProjectItem[]

  return (
    <section id="projects" className="mx-auto max-w-3xl px-5 py-24">
      <ScrollReveal>
        <SectionHeading eyebrow="04" title={t('projects.heading')} />
      </ScrollReveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {items.map((project, i) => (
          <ScrollReveal key={project.name} delay={i * 0.06}>
            <ProjectCard {...project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
