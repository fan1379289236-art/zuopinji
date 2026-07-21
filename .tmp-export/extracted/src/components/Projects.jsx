import { useRef } from 'react'
import SpecularCard from './SpecularCard'
import { projects } from '../data/content'
import { useGSAP } from '../lib/gsap'
import { revealHead, staggerItems, parallax } from '../lib/animations'

export default function Projects() {
  const ref = useRef(null)

  useGSAP(
    () => {
      revealHead(ref.current)
      staggerItems(ref.current, '.project')
      parallax(ref.current, '.parallax')
    },
    { scope: ref },
  )

  return (
    <section id="work" className="section projects" ref={ref}>
      <div className="container">
        <div className="sec-head">
          <p className="eyebrow">02 — SELECTED WORK</p>
          <div className="sec-display-wrap">
            <h2 className="sec-display">WORK</h2>
          </div>
          <h3 className="section__title">精选项目</h3>
          <p className="section__sub">影像、动态与 AI 生成——少量但完成度更高的作品。</p>
        </div>

        <div className="projects__list">
          {projects.map((p) => (
            <div className="project sec-item" key={p.id}>
              <SpecularCard className="project__spec" radius={20}>
                <a className="project__card" href={p.link || '#work'}>
                  <div className={`project__media hue-${p.media.hue} parallax`}>
                    <div className="project__media-inner" data-parallax-inner>
                      {p.media.type === 'video' && p.media.src ? (
                        <video src={p.media.src} autoPlay muted loop playsInline />
                      ) : p.media.type === 'image' && p.media.src ? (
                        <img src={p.media.src} alt={p.title} />
                      ) : (
                        <div className="project__placeholder">
                          <span className="project__play" aria-hidden="true">
                            ▶
                          </span>
                          <span className="project__ph-label">AI 视频 · 占位</span>
                        </div>
                      )}
                    </div>
                    <span className="project__badge">{p.category}</span>
                  </div>

                  <div className="project__info">
                    <span className="project__index">{p.index}</span>
                    <h3 className="project__title">{p.title}</h3>
                    <p className="project__desc">{p.desc}</p>
                    <div className="project__meta">
                      <span>{p.year}</span>
                      <span className="dot" />
                      <span>{p.client}</span>
                    </div>
                  </div>
                </a>
              </SpecularCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
