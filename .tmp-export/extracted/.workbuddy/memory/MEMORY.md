# 项目长期记忆：个人作品集网站

- 性质：视觉/AI 设计师的个人作品集（portfolio）。
- 技术栈：React 18 + Vite 5，纯前端，无后端。PC 优先，版心 1700px。
- 设计基调：暗色系（#07070a 底）、高级克制、科技感；**主色为红 `#ff4a4a`**（标题/强调/按钮 hover 均为红橙渐变 #ff4a4a→#ff7b5c→#ff9f6b）。
- 关键文件：
  - `src/data/content.js` —— 所有文案/数据（名字=张帆、邮箱、项目、优势）集中在此，迭代时主要改这里。
  - `src/styles/global.css` —— 设计系统与全部样式（tokens、grain、orb、grid、首屏 curtain、sec-display 大标题）。
  - `src/lib/gsap.js` —— GSAP 中央初始化（注册 ScrollTrigger/useGSAP、全局缓动默认 expo.out、prefers-reduced-motion 检测）。
  - `src/lib/animations.js` —— 复用动效原语：`revealHead`（英文大标题遮罩揭开先进场）、`staggerItems`（卡片 stagger）、`parallax`（图片轻 parallax，只动 transform）。
  - 组件：`src/components/` 下 Navbar / Hero / About / Projects / Strengths / Contact / SpecularCard / PixelBlast / Icon。
  - **`Reveal.jsx` 已弃用**（旧 IntersectionObserver 淡入），组件现统一用 GSAP；如要加滚动动效，在对应组件用 `useGSAP` 调 `revealHead`/`staggerItems`/`parallax`，并给元素加 `.sec-head`/`.sec-item`/`.parallax`/`[data-parallax-inner]` 类。
- 动效规范（用户要求）：夸张但高级、节奏慢、缓动丝滑（expo.out/power4，无廉价弹跳）、只用 transform/opacity/filter、once:true、尊重 reduced-motion。Hero 有完整 opening（curtain 升起 → 视频推镜 → 标题压缩+位移+遮罩揭开 → CTA/motto 依次进场）。
- 资源约定：`public/hero.mp4`、`public/hero2.mp4`（首屏双视频轮播）、`public/projects/*`、`public/avatar.jpg`。缺失时回退动态光晕占位。
- 背景与卡片：首屏下方固定层 `PixelBlast`（three+postprocessing 像素动效，红）；项目/优势/关于卡片用 `SpecularCard`（ogl 鼠标跟随红色高光边框，IntersectionObserver 懒挂载避免 WebGL 上下文耗尽）。
- 启动：隔离 node `/c/Users/1/.workbuddy/binaries/node/versions/22.22.2`；`npm run dev` → 5173。注意：旧 dev 进程可能跨回合残留占住 5173，新进程会顺延到 5174/5175，Vite HMR 会自动同步磁盘改动，两个端口都反映最新代码。
