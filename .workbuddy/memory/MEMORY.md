# 项目长期记忆：张帆 个人作品集网站

- 性质：视觉/AI 设计师作品集（portfolio）。设计师名「张帆」（2026-07-19 由"林知"改名）。
- 技术栈：React 18 + Vite 5，纯前端。PC 优先，版心 1700px。
- 设计：暗色 `#07070a` 底、高级克制科技感；主色红 `#ff4a4a`（渐变 #ff4a4a→#ff7b5c→#ff9f6b）。
- 关键文件：
  - `src/data/content.js` — 所有文案/数据（名字、邮箱、项目、优势）集中处，改内容主要改这里。
  - `src/styles/global.css` — 设计系统与全部样式 tokens。
  - `src/lib/gsap.js` — GSAP 中央初始化（expo.out、reduced-motion）。
  - `src/lib/animations.js` — 动效原语 revealHead / staggerItems / parallax（once:true，只用 transform/opacity/filter）。
  - 组件 `src/components/`：Navbar/Hero/About/Projects/Strengths/Contact/SpecularCard/PixelBlast/Icon。Reveal.jsx 已弃用。
- 背景动效：`.site-bg` 固定层放 PixelBlast（three+postprocessing，红色像素流动）；卡片用 SpecularCard（ogl 红色高光描边，IntersectionObserver 懒挂载）。首屏双视频 hero.mp4/hero2.mp4 交叉淡入轮播。
- 运行：隔离 node `C:\Users\PC\.workbuddy\binaries\node\versions\22.22.2`；`npm run dev`→5173（后台 task 7hpNh8）。注意旧 dev 进程可能跨回合残留占端口，新进程顺延 5174/5175。
- 项目媒体：`projects` 数组 8 张卡(p1–p8)均配置视频+同名 poster，默认「点击封面播放」带声音、可拖动进度。3 张曾丢失的项目视频已全部恢复就位：moon-inn-ep2.mp4(36.3MB) 与 secret-heir.mp4(16.6MB) 由用户 D:/AIGC东西 源片重编码恢复，neon-city.web.mp4(33.4MB) 由微信母片恢复（均 1080p 网页版）。
- 视频压缩约定：用 imageio_ffmpeg 自带 ffmpeg（`C:\Users\PC\.workbuddy\binaries\python\versions\3.13.12\Lib\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe`），两遍编码：`libx264 -preset slow -pix_fmt yuv420p -b:v 1200k -maxrate 1500k -bufsize 2400k -vf scale=1920:1080` + `aac -b:a 128k -movflags +faststart`。中文路径先复制为 ASCII 临时名再喂给 ffmpeg。⚠️ 沙箱坑：① 后台 Bash(run_in_background) 中 `$FF` 变量不展开会致 ffmpeg 退出 127、随后空 tmp 覆盖源——务必用**直接 Bash + 内联 ffmpeg 绝对路径**；② 本沙箱**无 `/dev/null`**，`-pass 1 -f mp4 /dev/null` 会失败，pass1 要输出到真实临时文件；③ 永远先 `if [ -s "$TMP" ]` 校验非空再 `mv` 覆盖；④ ffmpeg(native Windows exe) 读不懂 Git Bash 的 `/tmp`，临时文件要用项目内绝对路径（如 `$PROJ/.enc`）。
- 已知占位遗留：邮箱已改为 `1379289236@qq.com`；仍缺真实头像 `avatar.jpg`。
