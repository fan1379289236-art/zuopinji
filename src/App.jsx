import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Ecommerce from './components/Ecommerce'
import Contact from './components/Contact'
import PixelBlast from './components/PixelBlast'
import { ScrollTrigger } from './lib/gsap'

export default function App() {
  // 字体 / 资源加载完成后刷新 ScrollTrigger，避免大标题换字体导致触发位置偏移
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh).catch(() => {})
    }
    const t = setTimeout(refresh, 600)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="site-bg" aria-hidden="true">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#ff4a4a"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples={false}
          liquid={false}
          speed={0.6}
          edgeFade={0.35}
          transparent
        />
      </div>
      <main>
        <Hero />
        <About />
        <Projects />
        <Ecommerce />
        <Contact />
      </main>
    </>
  )
}
