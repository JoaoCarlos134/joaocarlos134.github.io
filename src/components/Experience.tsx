import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'
import { SectionHeading } from './SectionHeading'

interface ExperienceItem {
  role: string
  company: string
  period: string
  bullets: string[]
}

export function Experience() {
  const { t } = useTranslation()
  const items = t('experience.items', { returnObjects: true }) as ExperienceItem[]
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.6'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 })

  return (
    <section id="experience" className="mx-auto max-w-3xl px-5 py-24">
      <ScrollReveal>
        <SectionHeading eyebrow="02" title={t('experience.heading')} />
      </ScrollReveal>

      <div ref={containerRef} className="relative mt-10">
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" aria-hidden="true" />
        {!reduceMotion && (
          <motion.div
            className="absolute left-[7px] top-1 w-px origin-top bg-accent"
            style={{ scaleY: lineScale, bottom: '4px' }}
            aria-hidden="true"
          />
        )}

        <div className="flex flex-col gap-10">
          {items.map((role, i) => (
            <ScrollReveal key={`${role.company}-${i}`} delay={0.05}>
              <div className="relative pl-8">
                <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold">
                    {role.role} <span className="text-ink-muted">· {role.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-ink-muted">{role.period}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {role.bullets.map((bullet, j) => (
                    <li key={j} className="text-sm leading-relaxed text-ink-muted">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
