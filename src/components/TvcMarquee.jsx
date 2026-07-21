import { useRef, useState } from 'react'
import { tvc } from '../data/content'

function TvcCard({ item, onPlayState }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const hasMedia = item.media?.type === 'video' && item.media.src

  const handlePlay = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
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
    <div className="tvc__card">
      <div className="tvc__media">
        {hasMedia ? (
          <video
            ref={videoRef}
            src={item.media.src}
            poster={item.media.poster}
            preload="metadata"
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
            <TvcCard key={`${item.id}-${i}`} item={item} onPlayState={setPaused} />
          ))}
        </div>
      </div>
    </div>
  )
}
