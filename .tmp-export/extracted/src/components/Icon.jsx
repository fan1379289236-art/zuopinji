// 极简线性图标（Lucide 风格），按需扩展
const paths = {
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.9 4.4L18 9l-4.1 1.6L12 15l-1.9-4.4L6 9l4.1-1.6L12 3Z" />
      <path d="M18.5 14l.8 1.9L21 16.8l-1.7.9L18.5 19.5l-.8-1.8L16 16.8l1.7-.9.8-1.9Z" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5Z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5Z" />
      <path d="M12 12l9-5M12 12v10M12 12l-9-5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
    </>
  ),
}

export default function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.sparkles}
    </svg>
  )
}
