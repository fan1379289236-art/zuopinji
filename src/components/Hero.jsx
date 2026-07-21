import { useEffect, useRef, useState } from 'react'
import { hero } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

const HERO_VIDEOS = ['/hero.mp4', '/hero2.mp4']

export default function Hero() {
  const [idx, setIdx] = useState(0)
  const [ready, setReady] = useState(false)
  const refs = useRef([])
  const heroRef = useRef(null)

  // 切到当前视频时自动播放（静音 + playsInline 可绕过浏览器自动播放限制）
  useEffect(() => {
    const v = refs.current[idx]
    if (!v) return
    const p = v.play()
    if (p && typeof p.catch === 'function') {
      p.catch((err) => console.warn('[Hero video] play() failed:', err))
    }
  }, [idx])

  const handleNext = () => setIdx((i) => (i + 1) % HERO_VIDEOS.length)

  // 完整 opening 动画：遮幕揭开 → 视频电影感推镜 → 标题遮罩揭开 + 压缩后归位 → 元素依次进场
  useGSAP(
    () => {
      const q = gsap.utils.selector(heroRef)
      const curtain = q('.hero__curtain')[0]

      if (prefersReducedMotion) {
        gsap.set(curtain, { autoAlpha: 0 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // 1) 黑色遮幕从顶部升起，揭开首屏
      gsap.set(curtain, { yPercent: 0 })
      tl.to(curtain, { yPercent: -100, duration: 1.15, ease: 'power4.inOut' }, 0)

      // 2) 视频电影感推镜（轻微放大 + 淡入）
      tl.from(q('.hero__media'), { scale: 1.18, autoAlpha: 0, duration: 1.8, ease: 'power3.out' }, 0.05)

      // 3) 顶部 tagline 下落淡入
      tl.from(q('.hero__tagline'), { y: -22, autoAlpha: 0, duration: 1.0 }, 0.55)

      // 4) 主标题：压缩(scaleY/scaleX) + 位移，随后归位（drop-shadow 保留在父级）
      tl.from(
        q('.hero__title'),
        {
          scaleY: 0.72,
          scaleX: 1.08,
          x: -28,
          y: 26,
          autoAlpha: 0,
          duration: 1.6,
        },
        0.5,
      )
      // 内层：遮罩揭开 + 模糊聚焦（模糊放在内层，避免覆盖父级 drop-shadow）
      tl.from(
        q('.hero__title-inner'),
        { yPercent: 125, filter: 'blur(14px)', duration: 1.4 },
        0.55,
      )

      // 5) 左下角视频指示点
      tl.from(q('.hero__videos'), { autoAlpha: 0, y: 14, duration: 0.8 }, 0.95)

      // 6) CTA 与 motto 依次上浮进场
      tl.from(q('.btn--editorial'), { y: 46, autoAlpha: 0, duration: 1.1 }, 1.0)
      tl.from(q('.hero__motto'), { y: 46, autoAlpha: 0, duration: 1.1 }, 1.12)
    },
    { scope: heroRef },
  )

  return (
    <section id="home" className="hero hero--editorial" ref={heroRef}>
      <div className="hero__media">
        {HERO_VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="hero__video"
            src={src}
            muted
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            autoPlay={i === 0}
            onCanPlay={() => {
              if (i === idx) setReady(true)
            }}
            onEnded={handleNext}
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}

        {!ready && (
          <div className="hero__fallback" aria-hidden="true">
            <div className="hero__grid" />
            <div className="orb orb--hero1" />
            <div className="orb orb--hero2" />
          </div>
        )}

        <div className="hero__scrim" />
      </div>

      <div className="container hero__content">
        <div className="hero__top">
          <span className="hero__tagline">{hero.tagline}</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">
            <span className="hero__title-inner">{hero.title}</span>
          </span>
        </h1>

        <div className="hero__bottom">
          <a className="btn btn--editorial" href={hero.cta.href}>
            {hero.cta.label}
          </a>

          <div className="hero__motto">
            {hero.motto.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hero__videos" aria-hidden="true">
        {HERO_VIDEOS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={'hero__dot' + (i === idx ? ' is-active' : '')}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>

      <div className="hero__curtain" aria-hidden="true" />
    </section>
  )
}
