export default function HeroFigure({ className }) {
  // 占位用的人物剪影：你可以直接把这个 <svg> 替换成 <img src="/hero-portrait.png" />
  return (
    <div className={className}>
      <svg
        viewBox="0 0 560 700"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroFigureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5c5c6c" />
            <stop offset="30%" stopColor="#2d2d38" />
            <stop offset="100%" stopColor="#07070a" />
          </linearGradient>
        </defs>
        <path
          d="M280 70 C190 70 140 145 140 235 C140 295 165 340 200 375 C120 415 65 540 25 700 L535 700 C495 540 440 415 360 375 C395 340 420 295 420 235 C420 145 370 70 280 70 Z"
          fill="url(#heroFigureGrad)"
        />
        <ellipse cx="280" cy="250" rx="78" ry="24" fill="#0c0c12" opacity="0.75" />
        <path d="M215 245 L345 245" stroke="#6a6a76" strokeWidth="4" strokeLinecap="round" />
        <path d="M280 225 L280 265" stroke="#6a6a76" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </svg>
      <span className="hero__figure-label">放人像图</span>
    </div>
  )
}
