import { useTranslation } from 'react-i18next'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'

interface EducationItem {
  title: string
  org: string
  period: string
}

export function Education() {
  const { t } = useTranslation()
  const items = t('education.items', { returnObjects: true }) as EducationItem[]

  return (
    <section id="education" className="mx-auto max-w-3xl px-5 py-24">
      <ScrollReveal>
        <SectionHeading eyebrow="05" title={t('education.heading')} />
      </ScrollReveal>

      <div className="mt-8 flex flex-col gap-3">
        {items.map((edu, i) => (
          <ScrollReveal key={`${edu.title}-${i}`} delay={i * 0.05}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-xl border border-border bg-surface px-5 py-4">
              <div>
                <h3 className="font-semibold">{edu.title}</h3>
                <p className="text-sm text-ink-muted">{edu.org}</p>
              </div>
              <span className="font-mono text-xs text-ink-muted">{edu.period}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
