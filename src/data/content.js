// ============================================================
//  内容中心 —— 所有文案、数据都在这里集中修改，方便后续迭代。
//  名字 / 邮箱 / 项目 等均为占位示例，替换成你自己的即可。
// ============================================================

export const site = {
  name: '张帆', // 占位名，替换成你的名字
  role: '视觉设计师 · AI 视频制作',
  email: '1379289236@qq.com',
  nav: [
    { label: '关于', href: '#about' },
    { label: '项目', href: '#work' },
    { label: '电商套系', href: '#ecommerce' },
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
  fullName: '张帆',
  englishName: 'Zhang Fan',
  title: '视觉与 AI 影像作品集',
  resume: {
    education: {
      label: '教育经历',
      entries: [
        {
          period: '2022.9 — 2025.6',
          title: '全日制本科',
          org: '广西财经学院',
          desc: '主修工程造价、项目管理、工程经济，掌握工程预决算、图纸识图，熟练使用 CAD、广联达软件，具备工程项目成本管控、招投标文件编制能力。',
        },
      ],
    },
    skills: {
      label: '个人技能',
      groups: [
        {
          title: 'AI 视觉设计和内容制作',
          desc: '精通 PS、PR、剪映、comfy ui、Seedream2.0 等，擅长文生图、图生图、图像精修、海报设计、IP 角色设定、三视图规范、动态视频制作，覆盖平面视觉、IP 形象、动态视频全流程，实现音视频一体化合成。',
        },
        {
          title: '大模型应用',
          desc: '熟练使用 ChatGPT、Gemini 等主流大模型工具，擅长提示词工程、创意策划辅助、脚本撰写与流程编排，可通过 AI 优化创作逻辑，高效提升整体内容产出效率。',
        },
      ],
    },
    experience: {
      label: '工作经验',
      entries: [
        {
          period: '2025.05 — 2025.11',
          title: '电商运营（京东店长）',
          org: '合肥康泽宏大药房有限公司',
          desc: '负责平台日常运营工作，完成商品上下架、库存及价格维护，精准编辑商品文案、图片视频素材，优化主图与详情页页面，策划落实各类促销活动；对接客户咨询，处理订单及售后问题，保障客户满意度。同时统计分析流量、转化率、用户反馈等运营数据，依据数据分析优化运营方案，并做好跨部门沟通协调，提升商品曝光与产品销量。',
        },
      ],
    },
  },
}

export const projects = [
  {
    id: 'p1',
    index: '01',
    title: 'When the God Falls',
    category: 'AI 视频 · 叙事',
    year: '2026',
    client: '个人创作',
    desc: '血色红月高悬于骸骨废墟之上，神权陨落的纪元悄然开启。这是原创 AI 动画系列《When the God Falls》的开篇之作，以暗黑史诗的视觉基调，搭建末世神话世界观，呈现从概念设定到成片叙事的完整影像实验。',
    media: { type: 'video', src: '/projects/god-falls-ep1.mp4', poster: '/projects/god-falls-ep1-poster.jpg' },
  },
  {
    id: 'p2',
    index: '02',
    title: '月栖列车旅馆',
    category: 'AI 视频 · 叙事',
    year: '2026',
    client: '个人创作',
    desc: '月光落檐，旅人敲门。以东方志怪美学铺陈一间只在月夜现身的神秘旅店，每位来客都携着一段尘缘往事。国风悬疑向AI叙事短片，用光影与留白铺展东方意境的奇幻物语。',
    media: { type: 'video', src: '/projects/moon-inn-ep2.mp4', poster: '/projects/moon-inn-ep2-poster.jpg' },
  },
  {
    id: 'p3',
    index: '03',
    title: '霓虹之城',
    category: 'AI 视频 · 叙事',
    year: '2025',
    client: '个人创作',
    desc: '霓虹流淌，雨雾漫城。以赛博朋克美学勾勒一座光怪陆离的未来都市，在流光与暗影间穿行，讲述人造光之下的孤独与欲望。都市科幻向 AI 影像短片，用霓虹色彩构筑沉浸式赛博视觉叙事。',
    media: { type: 'video', src: '/projects/neon-city.web.mp4', poster: '/projects/neon-city-poster.jpg' },
  },
  {
    id: 'p4',
    index: '04',
    title: '天道猎手',
    category: 'AI 视频 · 动作',
    year: '2026',
    client: '个人创作',
    desc: '天道为纲，猎手为刃。以东方玄幻世界观铺展一场秩序与叛逆的猎杀博弈，刀光穿梭于天地法则之间。国风热血动作向AI动画，以凌厉镜头演绎宿命猎手的孤勇征途。',
    media: { type: 'video', src: '/projects/tiandao.mp4', poster: '/projects/tiandao-poster.jpg' },
  },
  {
    id: 'p5',
    index: '05',
    title: 'The Secret Heir Graduation Day',
    category: 'AI 视频 · 叙事',
    year: '2026',
    client: '个人创作',
    desc: '毕业钟声敲响，身世之谜随之解封。以青春叙事包裹家族秘辛，在成人礼的分界点揭开继承人的身份棋局。现代剧情向AI短片，用细腻镜头铺展一场关于身份与抉择的成长序章。',
    media: { type: 'video', src: '/projects/secret-heir.mp4', poster: '/projects/secret-heir-poster.jpg' },
  },
  {
    id: 'p6',
    index: '06',
    title: '双人格斗',
    category: 'AI 视频 · 特效',
    year: '2026',
    client: '个人创作',
    desc: '高能双人对决片段，强调招式设计与打击感，展示 AI 动作生成的成片效果。',
    media: { type: 'video', src: '/projects/dual-fight.mp4', poster: '/projects/dual-fight-poster.jpg' },
  },
  {
    id: 'p7',
    index: '07',
    title: '春·澈',
    category: 'AI 视频 · MV',
    year: '2026',
    client: '个人创作',
    desc: '以《春·澈》为题的音乐影像，用 AI 视觉语言勾勒清澈灵动的春日氛围。',
    media: { type: 'video', src: '/projects/spring-che.mp4', poster: '/projects/spring-che-poster.jpg' },
  },
  {
    id: 'p8',
    index: '08',
    title: '空城里',
    category: 'AI 视频 · IP 动画',
    year: '2026',
    client: '个人创作',
    desc: '原创 IP 动画《空城里》，用 AI 视觉语言构建独特世界观与角色，呈现动画短片质感。',
    media: { type: 'video', src: '/projects/ip.mp4', poster: '/projects/ip-poster.jpg' },
  },
]

/* TVC / 商业广告 —— 底部自动横向滚动条。
   视频放 media.src，海报放 media.poster（已用各片 1s 处截图作为封面）。 */
export const tvc = [
  { id: 't1', title: 'DIOR', brand: 'DIOR', year: '2025', media: { type: 'video', src: '/projects/dior.mp4', poster: '/projects/dior-poster.jpg' } },
  { id: 't2', title: 'KVIDIO', brand: 'KVIDIO', year: '2025', media: { type: 'video', src: '/projects/kvidio.mp4', poster: '/projects/kvidio-poster.jpg' } },
  { id: 't3', title: '狼蛛鼠标', brand: 'AULA 狼蛛', year: '2025', media: { type: 'video', src: '/projects/aula.mp4', poster: '/projects/aula-poster.jpg' } },
  { id: 't4', title: 'Xiaomi 17 Ultra', brand: '小米', year: '2025', media: { type: 'video', src: '/projects/xiaomi.mp4', poster: '/projects/xiaomi-poster.jpg' } },
  { id: 't5', title: '瑞幸咖啡', brand: 'Luckin 瑞幸', year: '2025', media: { type: 'video', src: '/projects/luckin.mp4', poster: '/projects/luckin-poster.jpg' } },
  { id: 't6', title: '纯福狗粮', brand: '纯福', year: '2025', media: { type: 'video', src: '/projects/chunfu.mp4', poster: '/projects/chunfu-poster.jpg' } },
]

/* 电商套系图展示 —— 用图片网格呈现各品类电商设计套系。
   每条 img 放套系封面图（建议放 public/projects/ 下），留空则显示占位。
   images 可填多张，第一张作封面，角标显示套系张数。 */
export const ecommerce = [
  { id: 'e1', title: 'KVIDIO 蓝牙耳机', tag: '3C', images: [
    '/projects/e1-01.png',
    '/projects/e1-02.jpg',
    '/projects/e1-03.jpg',
    '/projects/e1-04.jpg',
    '/projects/e1-05.jpg',
    '/projects/e1-06.jpg',
    '/projects/e1-07.jpg',
    '/projects/e1-08.jpg',
    '/projects/e1-09.jpg',
    '/projects/e1-10.png',
  ] },
  { id: 'e2', title: 'biocoo 留香珠', tag: '家清', images: [
    '/projects/e2-01.jpg',
    '/projects/e2-02.png',
    '/projects/e2-03.png',
    '/projects/e2-04.jpg',
    '/projects/e2-05.png',
    '/projects/e2-06.png',
    '/projects/e2-07.png',
    '/projects/e2-08.png',
    '/projects/e2-09.png',
    '/projects/e2-10.jpg',
  ] },
  { id: 'e3', title: 'MeiGaomei空气炸锅', tag: '家电', images: [
    '/projects/e3-01.jpg',
    '/projects/e3-02.png',
    '/projects/e3-03.png',
    '/projects/e3-04.png',
    '/projects/e3-05.png',
    '/projects/e3-06.png',
    '/projects/e3-07.png',
    '/projects/e3-08.png',
    '/projects/e3-09.png',
    '/projects/e3-10.jpg',
  ] },
  { id: 'e4', title: 'ANKER蓝牙音箱', tag: '3C', images: [
    '/projects/e4-01.jpg',
    '/projects/e4-02.jpg',
    '/projects/e4-03.jpg',
    '/projects/e4-04.png',
    '/projects/e4-05.jpg',
    '/projects/e4-06.png',
    '/projects/e4-07.png',
    '/projects/e4-08.jpg',
    '/projects/e4-09.jpg',
  ] },
]

export const contact = {
  eyebrow: '04 — CONTACT',
  headingLines: ['一起把想法', '做成作品'],
  email: '1379289236@qq.com',
  socials: [
    { label: '微信', href: '#', qr: '/wechat-qr.png' },
    { label: 'QQ', href: '#', qr: '/qq-qr.png' },
    { label: '电话', href: '#', phone: '18677537516' },
  ],
}
