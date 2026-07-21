# 资源放置说明

本目录（`public/`）下的文件会被 Vite 原样拷贝到构建根目录，可直接通过绝对路径引用。

## 1. 首页视频背景
把你的首页视频命名为 `hero.mp4` 放在本目录：
```
public/hero.mp4
```
页面会在视频可播放后自动淡入显示；缺失时回退到动态光晕 + 网格背景，不影响预览。

## 2. 精选项目媒体
在 `src/data/content.js` 的 `projects` 数组里，把对应项目的 `media` 改成：
```js
// 用视频
media: { type: 'video', src: '/projects/neon-drift.mp4', hue: 'violet' }
// 或用图片
media: { type: 'image', src: '/projects/form-light.jpg', hue: 'blue' }
```
再把文件放到：
```
public/projects/你的文件名.mp4  (或 .jpg / .png / .webp)
```
`hue` 仅用于占位渐变配色，可填 violet / blue / teal / amber。

## 3. 头像 / 人物图
当前为渐变 + 名字首字的占位。要换成真实照片，可在 `src/components/About.jsx`
的 `.avatar__inner` 内替换为 `<img src="/avatar.jpg" alt="头像" />`，
并把图片放到 `public/avatar.jpg`。
