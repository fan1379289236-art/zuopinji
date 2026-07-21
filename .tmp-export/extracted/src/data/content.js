// ============================================================
//  内容中心 —— 所有文案、数据都在这里集中修改，方便后续迭代。
//  名字 / 邮箱 / 项目 等均为占位示例，替换成你自己的即可。
// ============================================================

export const site = {
  name: '张帆', // 占位名，替换成你的名字
  role: '视觉设计师 · AI 视频制作',
  email: 'hello@linzhi.studio',
  nav: [
    { label: '关于', href: '#about' },
    { label: '项目', href: '#work' },
    { label: '优势', href: '#strengths' },
    { label: '联系', href: '#contact' },
  ],
}

export const hero = {
  tagline: 'AI VISUAL DESIGNER · PORTFOLIO / 2026',
  title: 'AIGC作品集',
  stat: { value: '120+', label: 'PROJECTS' },
  cta: { label: 'VIEW PROJECTS', href: '#work' },
  motto: ['FORM IS NOT DECORATION', '形态，不是装饰'],
}

export const about = {
  eyebrow: '01 — ABOUT',
  heading: '关于我',
  intro: [
    '我相信好的视觉不是装饰，而是叙事。过去几年，我把传统设计方法与 AI 生成、视频制作结合起来，为品牌打造有记忆点的影像系统。',
    '从一张概念图到一支成片，我习惯把控从创意到落地的每一道工序——这也让我能在「快」与「好」之间，找到属于每个项目的平衡点。',
  ],
  contacts: [
    { label: 'EMAIL', value: 'hello@linzhi.studio' },
    { label: 'WECHAT', value: 'linzhi_studio' },
    { label: 'BASED IN', value: '上海 · Shanghai' },
  ],
  stats: [
    { value: '120+', label: '完成项目' },
    { value: '8', label: '从业年限' },
    { value: '40+', label: '合作品牌' },
    { value: '12', label: '设计奖项' },
  ],
}

export const projects = [
  {
    id: 'p1',
    index: '01',
    title: 'Neon Drift — 品牌动态影像',
    category: 'AI 视频 · 品牌',
    year: '2025',
    client: '科技品牌',
    desc: '以 AI 生成的关键帧为骨架，结合实拍与合成，输出一支 60 秒的品牌主视觉影片，在社媒获得超 200 万次播放。',
    media: { type: 'placeholder', hue: 'violet' },
  },
  {
    id: 'p2',
    index: '02',
    title: 'Silent Garden — AI 概念短片',
    category: 'AI 视频 · 叙事',
    year: '2025',
    client: '个人创作',
    desc: '完全由文生视频模型驱动的实验短片，探索「静默自然」的视觉语言，入选某独立影像展映单元。',
    media: { type: 'placeholder', hue: 'teal' },
  },
  {
    id: 'p3',
    index: '03',
    title: 'Form & Light — 视觉识别系统',
    category: '视觉设计 · 品牌',
    year: '2024',
    client: '设计工作室',
    desc: '为新锐设计工作室构建从 Logo、动态标识到社交模板的一体化视觉系统，强调克制与秩序感。',
    media: { type: 'placeholder', hue: 'blue' },
  },
]

export const strengths = [
  { index: '01', title: '视觉设计', desc: '品牌识别、版式与视觉系统，强调克制、秩序与高级感。', icon: 'eye' },
  { index: '02', title: 'AI 图像生成', desc: '熟练运用主流文生图工具做概念探索与高精度出图。', icon: 'sparkles' },
  { index: '03', title: 'AI 视频制作', desc: '文生视频、图生视频与后期合成，输出成片级动态影像。', icon: 'video' },
  { index: '04', title: '品牌动态视觉', desc: '将静态识别延展为动态语言，适配多平台传播。', icon: 'layers' },
  { index: '05', title: '3D 与动效', desc: '基础建模与动效设计，为画面增加空间与质感。', icon: 'cube' },
  { index: '06', title: '创意指导', desc: '从 brief 到成片把控创意方向，确保叙事一致性。', icon: 'compass' },
]

export const contact = {
  eyebrow: '05 — CONTACT',
  headingLines: ['一起把想法', '做成作品'],
  email: 'hello@linzhi.studio',
  socials: [
    { label: 'Behance', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: '微信', href: '#' },
    { label: 'Email', href: 'mailto:hello@linzhi.studio' },
  ],
}
