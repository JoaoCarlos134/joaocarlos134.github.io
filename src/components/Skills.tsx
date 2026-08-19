import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'

interface SkillGroup {
  category: string
  items: string[]
}

export function Skills() {
  const { t } = useTranslation()
  const groups = t('skills.groups', { returnObjects: true }) as SkillGroup[]

  return (
    <section id="skills" className="py-24">
      <ScrollReveal>
        <SectionHeading eyebrow="04" title={t('skills.heading')} />
      </ScrollReveal>

      <div className="mt-8 flex flex-col gap-6">
        {groups.map((group, i) => (
          <ScrollReveal key={group.category} delay={i * 0.05}>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -2 }}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent-strong"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
