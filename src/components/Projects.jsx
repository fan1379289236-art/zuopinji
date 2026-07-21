import { useRef, useState, useEffect } from 'react'
import SpecularCard from './SpecularCard'
import TvcMarquee from './TvcMarquee'
import { projects } from '../data/content'
import { useGSAP } from '../lib/gsap'
import { revealHead, staggerItems, parallax } from '../lib/animations'
import { registerPlayer, requestPlay } from '../lib/videoCoordinator'

function ProjectCard({ p }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [inView, setInView] = useState(false)
  const isVideo = p.media.type === 'video' && p.media.src
  const isLink = Boolean(p.link)

  // 懒加载：卡片进入视口附近才挂载视频 src，避免首屏并发拉取全部视频
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        })
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // 注册到视频协调器：播放本卡时，其它卡会被暂停并回到初始状态
  useEffect(() => {
    const stop = () => {
      const v = videoRef.current
      if (v) {
        v.pause()
        v.currentTime = 0
        v.controls = false
      }
      setPlaying(false)
    }
    return registerPlayer(p.id, stop)
  }, [p.id])

  const handlePlay = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    requestPlay(p.id) // 先暂停其它视频
    v.muted = false
    v.controls = true
    v.play()
    setPlaying(true)
  }

  const handleEnded = () => {
    setPlaying(false)
    if (videoRef.current) videoRef.current.controls = false
  }

  const handleLoadedMeta = (e) => {
    setDuration(e.currentTarget.duration || 0)
  }

  const handleTimeUpdate = (e) => {
    const v = e.currentTarget
    if (v.duration) setProgress((v.currentTime / v.duration) * 100)
  }

  const fmtTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const inner = (
    <>
      <div className={`project__media hue-${p.media.hue}${playing ? '' : ' parallax'}`}>
        <div className="project__media-inner" data-parallax-inner>
          {isVideo ? (
            <video
              ref={videoRef}
              src={inView ? p.media.src : undefined}
              poster={p.media.poster}
              preload={inView ? 'metadata' : 'none'}
              playsInline
              onEnded={handleEnded}
              onLoadedMetadata={handleLoadedMeta}
              onTimeUpdate={handleTimeUpdate}
            />
          ) : p.media.type === 'image' && p.media.src ? (
            <img src={p.media.src} alt={p.title} loading="lazy" decoding="async" />
          ) : (
            <div className="project__placeholder">
              <span className="project__play" aria-hidden="true">
                ▶
              </span>
              <span className="project__ph-label">AI 视频 · 占位</span>
            </div>
          )}
        </div>

        {isVideo && !playing && (
          <button
            className="project__playbtn"
            onClick={handlePlay}
            aria-label="播放视频"
          >
            <span className="project__playbtn-icon" aria-hidden="true">
              ▶
            </span>
          </button>
        )}

        {isVideo && duration > 0 && (
          <span className="project__duration">{fmtTime(duration)}</span>
        )}

        {isVideo && (
          <span className="project__progress" aria-hidden="true">
            <span
              className="project__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </span>
        )}
      </div>

      <div className="project__info">
        <span className="project__index">{p.index}</span>
        <h3 className="project__title">{p.title}</h3>
        <p className="project__desc">{p.desc}</p>
      </div>
    </>
  )

  return (
    <div className="project sec-item" ref={cardRef}>
      <SpecularCard className="project__spec" radius={20}>
        {isLink ? (
          <a
            className="project__card"
            href={p.link}
            target="_blank"
            rel="noreferrer"
          >
            {inner}
          </a>
        ) : (
          <div className="project__card">{inner}</div>
        )}
      </SpecularCard>
    </div>
  )
}

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
            <ProjectCard p={p} key={p.id} />
          ))}
        </div>

        <TvcMarquee />
      </div>
    </section>
  )
}
