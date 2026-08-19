import { useTranslation } from 'react-i18next'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-24">
      <ScrollReveal>
        <SectionHeading eyebrow="01" title={t('about.heading')} />
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">{t('about.body')}</p>
      </ScrollReveal>
    </section>
  )
}
