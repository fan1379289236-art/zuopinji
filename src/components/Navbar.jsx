import { useEffect, useRef, useState } from 'react'
import { site } from '../data/content'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  // 导航栏开场：从顶部下落淡入（在首屏遮幕升起后）
  useGSAP(
    () => {
      if (prefersReducedMotion) return
      gsap.from(navRef.current, {
        yPercent: -120,
        autoAlpha: 0,
        duration: 1.0,
        delay: 0.25,
        ease: 'expo.out',
      })
    },
    { scope: navRef },
  )

  useEffect(() => {
    const onScroll = () => {
      // 滑过首屏（接近底部）后才启用磨砂玻璃固定导航，
      // 这样首屏视频上导航保持透明，进入第二屏才浮现磨砂质感。
      const threshold = Math.max(window.innerHeight - 120, 200)
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header ref={navRef} className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__logo" href="#home" aria-label="返回顶部">
          <span className="nav__mark">{site.name.replace(/\s/g, '').slice(0, 1)}</span>
          <span className="nav__name">{site.name}</span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--primary nav__cta" href="#contact" onClick={() => setOpen(false)}>
          取得联系
        </a>

        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-label="切换菜单"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
