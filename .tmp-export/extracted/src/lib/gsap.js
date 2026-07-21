// ============================================================
//  GSAP 中央初始化
//  - 注册 ScrollTrigger / useGSAP
//  - 统一「慢节奏 + 丝滑缓动 + 无廉价弹跳」的默认风格
//  - 全局 reduced-motion 检测，无障碍优先
// ============================================================
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// 全局默认：缓动用 expo.out（最丝滑、无回弹），节奏偏慢
gsap.defaults({ ease: 'expo.out', duration: 1.1 })

// 移动端 resize 不频繁刷新 ScrollTrigger，避免抖动
ScrollTrigger.config({ ignoreMobileResize: true })

// 平滑滚动时让 ScrollTrigger 跟随更顺
ScrollTrigger.normalizeScroll(false)

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, useGSAP }
