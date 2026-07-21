import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { contact, site } from '../data/content'
import { useGSAP } from '../lib/gsap'
import { revealHead, staggerItems } from '../lib/animations'

export default function Contact() {
  const ref = useRef(null)
  const [modal, setModal] = useState(null) // { type:'qr', src, hint } | { type:'phone', value }

  useGSAP(
    () => {
      revealHead(ref.current)
      staggerItems(ref.current, '.sec-item')
    },
    { scope: ref },
  )

  const openQr = (src, hint) => setModal({ type: 'qr', src, hint })
  const openPhone = (value) => setModal({ type: 'phone', value })
  const closeModal = () => setModal(null)

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
            {contact.socials.map((s) => {
              const isQr = Boolean(s.qr)
              const isPhone = Boolean(s.phone)
              if (isQr || isPhone) {
                return (
                  <button
                    key={s.label}
                    type="button"
                    className="contact__social"
                    onClick={() =>
                      isQr
                        ? openQr(s.qr, `扫一扫，添加${s.label}好友`)
                        : openPhone(s.phone)
                    }
                  >
                    {s.label}
                  </button>
                )
              }
              return (
                <a
                  key={s.label}
                  className="contact__social"
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              )
            })}
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

      {modal &&
        createPortal(
          <div
            className="qr-modal"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            <button
              type="button"
              className="qr-modal__close"
              aria-label="关闭"
              onClick={closeModal}
            >
              ×
            </button>

            {modal.type === 'qr' ? (
              <>
                <img
                  src={modal.src}
                  alt="二维码"
                  className="qr-modal__img"
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="qr-modal__hint">{modal.hint}</p>
              </>
            ) : (
              <div
                className="phone-card"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="phone-card__label">联系电话</span>
                <a className="phone-card__num" href={`tel:${modal.value}`}>
                  {modal.value}
                </a>
                <p className="qr-modal__hint">点击号码可直接拨打</p>
              </div>
            )}
          </div>,
          document.body,
        )}
    </section>
  )
}
