import { useRef } from 'react'
import Icon from './Icon'
import SpecularCard from './SpecularCard'
import { strengths } from '../data/content'
import { useGSAP } from '../lib/gsap'
import { revealHead, staggerItems } from '../lib/animations'

export default function Strengths() {
  const ref = useRef(null)

  useGSAP(
    () => {
      revealHead(ref.current)
      staggerItems(ref.current, '.strength')
    },
    { scope: ref },
  )

  return (
    <section id="strengths" className="section strengths" ref={ref}>
      <div className="container">
        <div className="sec-head">
          <p className="eyebrow">03 — CAPABILITIES</p>
          <div className="sec-display-wrap">
            <h2 className="sec-display">CAPABILITIES</h2>
          </div>
          <h3 className="section__title">我的优势</h3>
        </div>

        <div className="strengths__grid">
          {strengths.map((s) => (
            <div className="strength sec-item" key={s.title}>
              <SpecularCard className="strength__spec" radius={16}>
                <div className="strength__card">
                  <span className="strength__index">{s.index}</span>
                  <span className="strength__icon">
                    <Icon name={s.icon} />
                  </span>
                  <h3 className="strength__title">{s.title}</h3>
                  <p className="strength__desc">{s.desc}</p>
                </div>
              </SpecularCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
