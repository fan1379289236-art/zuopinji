import { useRef } from 'react'
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

  const { resume } = about

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
          <aside className="about__media sec-item">
            <div className="avatar">
              <div className="about__media-info">
                <h2 className="about__media-name">
                  {about.fullName}
                  <span className="about__media-en">{about.englishName}</span>
                </h2>
                <p className="about__media-role">{site.role}</p>
              </div>
              <div className="avatar__inner">
                <span className="avatar__initials">
                  {site.name.replace(/\s/g, '').slice(0, 2)}
                </span>
              </div>
              <span className="avatar__tag">AVATAR</span>
            </div>
          </aside>

          <div className="about__body">
            <div className="resume">
              {/* 教育经历 */}
              <div className="resume__section sec-item">
                <h4 className="resume__section-label">{resume.education.label}</h4>
                {resume.education.entries.map((entry, i) => (
                  <div key={i} className="resume__entry">
                    <div className="resume__entry-head">
                      <span className="resume__entry-title">{entry.title}</span>
                      <span className="resume__entry-org">{entry.org}</span>
                      <span className="resume__entry-period">{entry.period}</span>
                    </div>
                    <p className="resume__entry-desc">{entry.desc}</p>
                  </div>
                ))}
              </div>

              {/* 个人技能 */}
              <div className="resume__section sec-item">
                <h4 className="resume__section-label">{resume.skills.label}</h4>
                <div className="resume__skills">
                  {resume.skills.groups.map((group, i) => (
                    <div key={i} className="resume__skill">
                      <h5 className="resume__skill-title">{group.title}</h5>
                      <p className="resume__skill-desc">{group.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 工作经验 */}
              <div className="resume__section sec-item">
                <h4 className="resume__section-label">{resume.experience.label}</h4>
                {resume.experience.entries.map((entry, i) => (
                  <div key={i} className="resume__entry">
                    <div className="resume__entry-head">
                      <span className="resume__entry-title">{entry.title}</span>
                      <span className="resume__entry-org">{entry.org}</span>
                      <span className="resume__entry-period">{entry.period}</span>
                    </div>
                    <p className="resume__entry-desc">{entry.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
