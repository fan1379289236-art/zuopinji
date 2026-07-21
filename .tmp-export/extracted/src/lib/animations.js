// ============================================================
//  可复用的滚动动效原语（基于 ScrollTrigger）
//  风格：英文大标题「遮罩揭开」先大幅进场，卡片随后 stagger 出现，
//        图片做轻量 parallax。全部只用 transform/opacity/filter，
//        且 once:true，不影响滚动性能。
// ============================================================
import { gsap, prefersReducedMotion } from './gsap'

// 模块标题区：大幅英文显示标题先以遮罩(wipe)揭开，其余元素随后上浮淡入
export function revealHead(scope) {
  if (prefersReducedMotion || !scope) return
  const head = scope.querySelector('.sec-head')
  if (!head) return

  const wrap = head.querySelector('.sec-display-wrap')
  const display = head.querySelector('.sec-display')
  const rest = Array.from(head.children).filter((c) => c !== wrap)

  const tl = gsap.timeline({
    scrollTrigger: { trigger: head, start: 'top 82%', once: true },
    defaults: { ease: 'expo.out' },
  })

  // 大幅英文标题：从下方遮罩揭开（父级 overflow:hidden，内层 yPercent 上移归位）
  if (display) {
    tl.from(display, { yPercent: 120, duration: 1.5 }, 0)
  }
  // 其余（eyebrow / 中文标题 / 副文案）依次上浮淡入
  if (rest.length) {
    tl.from(
      rest,
      { y: 38, autoAlpha: 0, duration: 1.05, stagger: 0.09 },
      0.14,
    )
  }
  return tl
}

// 卡片 / 区块：进入视口后依次 stagger 出现（标题先进场，卡片随后）
export function staggerItems(scope, selector = '.sec-item') {
  if (prefersReducedMotion || !scope) return
  const items = gsap.utils.toArray(scope.querySelectorAll(selector))
  if (!items.length) return

  // 以容器进入视口为触发点（略晚于标题，形成「标题先、卡片后」的顺序）
  const trigger = items[0].parentElement || scope
  gsap.from(items, {
    scrollTrigger: { trigger, start: 'top 72%', once: true },
    y: 80,
    autoAlpha: 0,
    duration: 1.15,
    stagger: 0.13,
    ease: 'expo.out',
  })
}

// 图片 / 媒体：轻量 parallax（只动 transform，scrub 平滑跟随，无性能负担）
export function parallax(scope, selector = '.parallax') {
  if (prefersReducedMotion || !scope) return
  gsap.utils.toArray(scope.querySelectorAll(selector)).forEach((el) => {
    const inner = el.querySelector('[data-parallax-inner]') || el.firstElementChild || el
    gsap.fromTo(
      inner,
      { yPercent: -7 },
      {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      },
    )
  })
}
