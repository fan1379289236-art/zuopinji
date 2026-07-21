import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ecommerce } from '../data/content'
import { useGSAP } from '../lib/gsap'
import { revealHead, staggerItems } from '../lib/animations'

export default function Ecommerce() {
  const ref = useRef(null)
  const [active, setActive] = useState(null) // 当前打开的套系
  const [idx, setIdx] = useState(0) // 当前展示的图序号
  const [tall, setTall] = useState(false) // 当前图是否为超长竖图（整宽铺满）
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 }) // 缩放与平移
  const [dragging, setDragging] = useState(false)
  const viewerRef = useRef(null)
  const imgRef = useRef(null)
  const dragRef = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0 })

  // 未缩放（≤1）且非长图时图片贴合居中；放大后或长竖图（需上下浏览）可自由拖动
  const clampView = (scale, x, y, isTall) => {
    if (scale <= 1 && !isTall) return { x: 0, y: 0 }
    return { x, y }
  }

  useGSAP(
    () => {
      revealHead(ref.current)
      staggerItems(ref.current, '.ecard')
    },
    { scope: ref },
  )

  // 打开新套系时，序号归零
  useEffect(() => {
    setIdx(0)
  }, [active])

  // 切换图片时重置「超长竖图」标记与缩放/平移，待新图 onLoad 后再判定
  useEffect(() => {
    setTall(false)
    setView({ scale: 1, x: 0, y: 0 })
  }, [active, idx])

  // 滚轮缩放（非 passive，需阻止默认滚动）
  useEffect(() => {
    const el = viewerRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.2 : -0.2
      setView((v) => {
        const scale = Math.min(10, Math.max(0.2, v.scale + delta))
        if (scale === v.scale) return v
        let nx = v.x
        let ny = v.y
        const img = imgRef.current
        // 缩放中心固定在鼠标指针：让指针下的图片点在缩放前后保持在屏幕同一位置
        if (img) {
          const r = img.getBoundingClientRect()
          // 以图片当前在屏幕上的中心（变换后）为基准计算指针偏移
          const rectCx = r.left + r.width / 2
          const rectCy = r.top + r.height / 2
          const crelx = e.clientX - rectCx
          const crely = e.clientY - rectCy
          const f = scale / v.scale
          nx = v.x + crelx * (1 - f)
          ny = v.y + crely * (1 - f)
        }
        const c = clampView(scale, nx, ny, tall)
        return { scale, x: c.x, y: c.y }
      })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [active, tall])

  // Esc 关闭 / 左右方向键切换
  useEffect(() => {
    if (!active) return
    const total = active.images ? active.images.length : 0
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (total > 1) {
        if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % total)
        if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + total) % total)
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, idx])

  const total = active && active.images ? active.images.length : 0

  const go = (step) => {
    if (total > 1) setIdx((i) => (i + step + total) % total)
  }

  return (
    <section id="ecommerce" className="section ecommerce" ref={ref}>
      <div className="container">
        <div className="sec-head">
          <p className="eyebrow">03 — E-COMMERCE</p>
          <div className="sec-display-wrap">
            <h2 className="sec-display">电商套系图</h2>
          </div>
          <p className="section__sub">
            为品牌打造的一整套电商视觉——主图、详情页与海报一体化设计，覆盖多品类。点击任意套系查看完整图组。
          </p>
        </div>

        <div className="ecards__grid">
          {ecommerce.map((s) => {
            const cover = s.images && s.images.length ? s.images[0] : ''
            const count = s.images ? s.images.length : 0
            return (
              <button
                type="button"
                className="ecard sec-item"
                key={s.id}
                onClick={() => setActive(s)}
                aria-label={`查看${s.title}完整套系`}
              >
                <div className="ecard__media">
                  {cover ? (
                    <img src={cover} alt={s.title} loading="lazy" />
                  ) : (
                    <div className="ecard__placeholder">
                      <span className="ecard__ph-label">套系图 · 待上传</span>
                    </div>
                  )}
                  {count > 1 && <span className="ecard__count">{count} 张</span>}
                  <div className="ecard__overlay">
                    <span className="ecard__overlay-name">{s.title}</span>
                    <span className="ecard__overlay-cta">查看完整套系 →</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {active &&
        createPortal(
          <div
            className="esuite-modal"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActive(null)
            }}
          >
            <div className="esuite-modal__panel">
              <div className="esuite-modal__head">
                <div>
                  <span className="esuite-modal__tag">{active.tag}</span>
                  <h3 className="esuite-modal__title">{active.title}</h3>
                  <span className="esuite-modal__sub">
                    {total ? `第 ${idx + 1} / ${total} 张${tall ? ' · 滚轮缩放 · 拖动查看' : ''}` : '图组待上传'}
                  </span>
                </div>
                <button
                  type="button"
                  className="esuite-modal__close"
                  onClick={() => setActive(null)}
                  aria-label="关闭"
                >
                  ✕
                </button>
              </div>

              <div className={`esuite-modal__stage${tall ? ' is-tall' : ''}`}>
                {total ? (
                  <>
                    {total > 1 && (
                      <button
                        type="button"
                        className="esuite-nav esuite-nav--prev"
                        onClick={() => go(-1)}
                        aria-label="上一张"
                      >
                        ‹
                      </button>
                    )}
                    <div
                      ref={viewerRef}
                      className={`esuite-modal__viewer${tall ? ' is-tall' : ''}${dragging ? ' is-grabbing' : ''}`}
                      onMouseDown={(e) => {
                        if (view.scale === 1 && !tall) return // 仅在未缩放且非长图时不触发拖拽
                        e.preventDefault()
                        setDragging(true)
                        dragRef.current = {
                          active: true,
                          sx: e.clientX,
                          sy: e.clientY,
                          ox: view.x,
                          oy: view.y,
                        }
                      }}
                      onMouseMove={(e) => {
                        const d = dragRef.current
                        if (!d.active) return
                        const nx = d.ox + (e.clientX - d.sx)
                        const ny = d.oy + (e.clientY - d.sy)
                        const c = clampView(view.scale, nx, ny, tall)
                        setView((v) => ({ ...v, x: c.x, y: c.y }))
                      }}
                      onMouseUp={() => {
                        dragRef.current.active = false
                        setDragging(false)
                      }}
                      onMouseLeave={() => {
                        dragRef.current.active = false
                        setDragging(false)
                      }}
                    >
                      <img
                        key={idx}
                        ref={imgRef}
                        src={active.images[idx]}
                        alt={`${active.title} ${idx + 1}`}
                        draggable={false}
                        className={`esuite-modal__img${tall ? ' is-tall' : ''}`}
                        style={{
                          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                        }}
                        onLoad={(e) => {
                          const img = e.currentTarget
                          const ratio = img.naturalHeight / img.naturalWidth
                          // 高宽比大于 2.5 才视为超长竖图（如详情长图），整宽显示；
                          // 海报类(1.5~1.8)按普通受限尺寸展示，与正常图一致
                          setTall(ratio > 2.5)
                          setView({ scale: 1, x: 0, y: 0 })
                        }}
                      />
                    </div>
                    {total > 1 && (
                      <button
                        type="button"
                        className="esuite-nav esuite-nav--next"
                        onClick={() => go(1)}
                        aria-label="下一张"
                      >
                        ›
                      </button>
                    )}
                  </>
                ) : (
                  <div className="esuite-modal__empty">该套系图尚未上传</div>
                )}
              </div>

              {total > 1 && (
                <div className="esuite-dots">
                  {active.images.map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      className={`esuite-dot${i === idx ? ' is-active' : ''}`}
                      onClick={() => setIdx(i)}
                      aria-label={`第 ${i + 1} 张`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
