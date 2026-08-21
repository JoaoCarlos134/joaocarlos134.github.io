import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'
import IsometricButton from '@/components/originkit/ui/keycap-button'
import { KEYCAP_PRIMARY, KEYCAP_SECONDARY } from '../lib/keycap'

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

        <div className="mt-8 flex flex-wrap items-center gap-8">
          <IsometricButton
            {...KEYCAP_PRIMARY}
            label={copied ? t('contact.copied') : email}
            onClick={copyEmail}
          />
          <IsometricButton {...KEYCAP_SECONDARY} label="LinkedIn" link={t('contact.linkedin')} newTab />
          <IsometricButton {...KEYCAP_SECONDARY} label="GitHub" link={t('contact.github')} newTab />
        </div>

        {/* The keycap's label lives on a canvas-like 3D face, so the copy
            confirmation is announced here instead of relying on the swap. */}
        <p aria-live="polite" className="sr-only">
          {copied ? t('contact.copied') : ''}
        </p>
      </ScrollReveal>
    </section>
  )
}
