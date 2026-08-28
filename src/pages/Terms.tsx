import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'
import { termsIntroduction, termsMeta, termsSections } from '../data/termsOfUse'

export default function Terms() {
  const handleIndexClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (!section) return

    event.preventDefault()
    window.history.replaceState(window.history.state, '', `#${sectionId}`)
    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="terms-page page-pad" lang="en">
      <header className="terms-hero">
        <span className="terms-hero__kicker">SCENE SCORE / LEGAL</span>
        <h1>Terms of Use</h1>
        <div className="terms-hero__meta">
          <span><small>Release Date</small>{termsMeta.releaseDate}</span>
          <span><small>Effective Date</small>{termsMeta.effectiveDate}</span>
        </div>
      </header>

      <div className="terms-layout">
        <aside className="terms-index" aria-label="Terms sections">
          <span>CONTENTS</span>
          {termsSections.map((section, index) => (
            <a
              key={section.title}
              href={`#terms-${index + 1}`}
              onClick={(event) => handleIndexClick(event, `terms-${index + 1}`)}
            >
              {section.title}
            </a>
          ))}
        </aside>

        <main className="terms-content">
          <section className="terms-introduction" aria-label="Introduction">
            {termsIntroduction.map((paragraph) => (
              <p className={paragraph.emphasis ? `is-${paragraph.emphasis}` : undefined} key={paragraph.text}>
                {paragraph.text}
              </p>
            ))}
          </section>

          {termsSections.map((section, index) => (
            <section className="terms-section" id={`terms-${index + 1}`} key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p className={paragraph.emphasis ? `is-${paragraph.emphasis}` : undefined} key={paragraph.text}>
                  {paragraph.text}
                </p>
              ))}
            </section>
          ))}
        </main>
      </div>

      <Link className="terms-back" to="/">
        RETURN HOME <ArrowUpRight aria-hidden="true" />
      </Link>
    </div>
  )
}
