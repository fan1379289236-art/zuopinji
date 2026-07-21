import { useRef } from 'react'
import { contact, site } from '../data/content'
import { useGSAP } from '../lib/gsap'
import { revealHead, staggerItems } from '../lib/animations'

export default function Contact() {
  const ref = useRef(null)

  useGSAP(
    () => {
      revealHead(ref.current)
      staggerItems(ref.current, '.sec-item')
    },
    { scope: ref },
  )

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact__bg" aria-hidden="true">
        <div className="orb orb--1" />
        <div className="orb orb--2" />
      </div>

      <div className="container contact__inner">
        <div className="sec-head">
          <p className="eyebrow">{contact.eyebrow}</p>
          <div className="sec-display-wrap">
            <h2 className="sec-display">CONTACT</h2>
          </div>

          <h2 className="contact__title">
            {contact.headingLines[0]}
            <br />
            <span className="grad">{contact.headingLines[1]}</span>
          </h2>

          <a className="contact__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>

          <div className="contact__socials">
            {contact.socials.map((s) => (
              <a
                key={s.label}
                className="contact__social"
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <footer className="contact__footer sec-item">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.role}
          </span>
          <a href="#home" className="contact__top">
            回到顶部 ↑
          </a>
        </footer>
      </div>
    </section>
  )
}
