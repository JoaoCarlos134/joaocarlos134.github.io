import { useTranslation } from 'react-i18next'
import { FileText, ShieldCheck } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'

interface Article {
  authors: string
  title: string
  venue: string
  year: string
  tag: string
}

interface Patent {
  title: string
  registry: string
  date: string
}

export function Publications() {
  const { t } = useTranslation()
  const articles = t('publications.articles', { returnObjects: true }) as Article[]
  const patents = t('publications.patents', { returnObjects: true }) as Patent[]

  return (
    <section id="publications" className="mx-auto max-w-3xl px-5 py-24">
      <ScrollReveal>
        <SectionHeading eyebrow="03" title={t('publications.heading')} />
      </ScrollReveal>

      <div className="mt-10 flex flex-col gap-3">
        <ScrollReveal>
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            <FileText size={14} /> {t('publications.articlesHeading')}
          </h3>
        </ScrollReveal>
        {articles.map((article, i) => (
          <ScrollReveal key={article.title} delay={i * 0.05}>
            <div className="rounded-xl border border-border bg-surface px-5 py-4">
              <p className="text-sm font-medium leading-snug">{article.title}</p>
              <p className="mt-1.5 text-sm text-ink-muted">{article.authors}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2 font-mono text-xs text-ink-muted">
                <span>
                  {article.venue}, {article.year}
                </span>
                {article.tag && (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent-strong">{article.tag}</span>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <ScrollReveal>
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            <ShieldCheck size={14} /> {t('publications.patentsHeading')}
          </h3>
        </ScrollReveal>
        {patents.map((patent, i) => (
          <ScrollReveal key={patent.registry} delay={i * 0.04}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-xl border border-border bg-surface px-5 py-4">
              <p className="max-w-lg text-sm font-medium leading-snug">{patent.title}</p>
              <div className="flex shrink-0 flex-col items-end font-mono text-xs text-ink-muted">
                <span>{patent.registry}</span>
                <span>{patent.date}</span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
