import { useRef, useState, useEffect } from 'react'
import { tvc } from '../data/content'
import { registerPlayer, requestPlay } from '../lib/videoCoordinator'

function TvcCard({ item, onPlayState, playerId }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [inView, setInView] = useState(false)
  const hasMedia = item.media?.type === 'video' && item.media.src

  // 懒加载：卡片进入视口才挂载视频 src，避免首屏并发拉取全部跑马灯视频
  useEffect(() => {
    const el = cardRef.current
    if (!el || !hasMedia) return
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
      { rootMargin: '150px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [hasMedia])

  // 注册到视频协调器：播放本卡时，其它卡（含项目视频与其它广告）会被暂停并回到初始状态
  useEffect(() => {
    const stop = () => {
      const v = videoRef.current
      if (v) {
        v.pause()
        v.currentTime = 0
        v.controls = false
      }
      setPlaying(false)
      onPlayState(false)
    }
    return registerPlayer(playerId, stop)
  }, [playerId, onPlayState])

  const handlePlay = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    requestPlay(playerId) // 先暂停其它视频
    v.muted = false
    v.controls = true
    v.play()
    setPlaying(true)
    onPlayState(true)
  }

  const handleEnded = () => {
    setPlaying(false)
    if (videoRef.current) videoRef.current.controls = false
    onPlayState(false)
  }

  const handleLoadedMeta = (e) => setDuration(e.currentTarget.duration || 0)
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

  return (
    <div className="tvc__card" ref={cardRef}>
      <div className="tvc__media">
        {hasMedia ? (
          <video
            ref={videoRef}
            src={inView ? item.media.src : undefined}
            poster={item.media.poster}
            preload={inView ? 'metadata' : 'none'}
            playsInline
            onEnded={handleEnded}
            onLoadedMetadata={handleLoadedMeta}
            onTimeUpdate={handleTimeUpdate}
          />
        ) : (
          <div className="tvc__placeholder">
            <span className="tvc__ph-play" aria-hidden="true">▶</span>
            <span className="tvc__ph-label">TVC · 待填充</span>
          </div>
        )}
      </div>

      {hasMedia && !playing && (
        <button className="tvc__playbtn" onClick={handlePlay} aria-label="播放广告">
          <span className="tvc__playbtn-icon" aria-hidden="true">▶</span>
        </button>
      )}

      <div className="tvc__caption">
        <span className="tvc__name">{item.title}</span>
      </div>

      {hasMedia && duration > 0 && (
        <span className="tvc__duration">{fmtTime(duration)}</span>
      )}
      {hasMedia && (
        <span className="tvc__progress" aria-hidden="true">
          <span className="tvc__progress-fill" style={{ width: `${progress}%` }} />
        </span>
      )}
    </div>
  )
}

export default function TvcMarquee() {
  const [paused, setPaused] = useState(false)
  if (!tvc || tvc.length === 0) return null
  // 复制一遍用于无缝循环
  const loop = [...tvc, ...tvc]

  return (
    <div className="tvc">
      <div className="tvc__head">
        <h3 className="tvc__title">商业广告 · TVC</h3>
        <span className="tvc__hint">悬停暂停 · 点击播放</span>
      </div>

      <div className={`tvc__viewport${paused ? ' is-paused' : ''}`}>
        <div
          className="tvc__track"
          style={{ animationDuration: `${tvc.length * 7}s` }}
        >
          {loop.map((item, i) => (
            <TvcCard key={`${item.id}-${i}`} item={item} onPlayState={setPaused} playerId={`${item.id}-${i}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
