import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Copy } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'
import { GithubIcon, LinkedinIcon } from './icons'

export function Contact() {
  const { t } = useTranslation()
  const email = t('contact.email')
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-5 py-24">
      <ScrollReveal>
        <SectionHeading eyebrow="06" title={t('contact.heading')} />
        <p className="mt-4 max-w-lg text-ink-muted">{t('contact.body')}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copyEmail}
            className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-transform hover:scale-105"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {email}
          </button>
          <a
            href={t('contact.linkedin')}
            className="rounded-full border border-border p-2.5 text-ink-muted transition-colors hover:border-accent hover:text-accent-strong"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={t('contact.github')}
            className="rounded-full border border-border p-2.5 text-ink-muted transition-colors hover:border-accent hover:text-accent-strong"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
