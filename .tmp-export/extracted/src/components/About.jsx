import { useRef } from 'react'
import SpecularCard from './SpecularCard'
import { about, site } from '../data/content'
import { useGSAP } from '../lib/gsap'
import { revealHead, staggerItems } from '../lib/animations'

export default function About() {
  const ref = useRef(null)

  useGSAP(
    () => {
      revealHead(ref.current)
      staggerItems(ref.current, '.sec-item')
    },
    { scope: ref },
  )

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <div className="sec-head">
          <p className="eyebrow">{about.eyebrow}</p>
          <div className="sec-display-wrap">
            <h2 className="sec-display">ABOUT</h2>
          </div>
          <h3 className="section__title">{about.heading}</h3>
        </div>

        <div className="about__grid">
          <div className="about__media sec-item">
            <div className="avatar">
              <div className="avatar__inner">
                <span className="avatar__initials">
                  {site.name.replace(/\s/g, '').slice(0, 2)}
                </span>
              </div>
              <span className="avatar__tag">AVATAR</span>
            </div>
          </div>

          <div className="about__body">
            <p className="about__lead sec-item">{about.intro[0]}</p>
            <p className="about__text sec-item">{about.intro[1]}</p>

            <ul className="about__contacts sec-item">
              {about.contacts.map((c) => (
                <li key={c.label}>
                  <span className="about__contact-label">{c.label}</span>
                  <span className="about__contact-value">{c.value}</span>
                </li>
              ))}
            </ul>

            <div className="stats">
              {about.stats.map((s) => (
                <SpecularCard
                  key={s.label}
                  className="specular-card--stat sec-item"
                  radius={14}
                >
                  <div className="stat">
                    <span className="stat__value">{s.value}</span>
                    <span className="stat__label">{s.label}</span>
                  </div>
                </SpecularCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
