import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border px-5 py-8 text-center">
      <p className="font-mono text-xs text-ink-muted">{t('footer.text')}</p>
    </footer>
  )
}
