# DESIGN.md — 默默禾你 · 禾木民宿官网

## 1. Visual Theme & Atmosphere

**设计哲学**：禾木的秋与冬，温暖木屋与清冽雪境之间的自然叙事。轻奢不轻浮，在地不土气。

**氛围关键词**：木质感 / 白桦纹理 / 暖金秋叶 / 冰蓝雪境 / 轻奢克制 / 手作温度

**一句话定调**：像推开一间禾木木屋的门——外面是雪山白桦，里面是炉火温暖。

**风格种子**：Natural Editorial × Alpine Lodge（自然编辑风 × 高山木屋）

---

## 2. Color Palette & Roles

```css
:root {
  /* === 秋日暖调（上半区） === */
  --amber:        #C47E3B;   /* 主强调色 — 按钮、链接、高亮 */
  --amber-rgb:    196,126,59;
  --amber-light:  #D4995A;   /* 浅强调 — hover 态、渐变过渡 */
  --amber-light-rgb: 212,153,90;
  --amber-deep:   #8B4A1B;   /* 深强调 — active、文字强调 */
  --amber-deep-rgb: 139,74,27;
  --wheat:        #E8CDA0;   /* 淡金 — 分隔线、浅背景 */
  --wheat-rgb:    232,205,160;

  /* === 冬日冷调（下半区） === */
  --ice:          #8BA8C0;   /* 冰蓝 — 冬季区强调 */
  --ice-rgb:      139,168,192;
  --ice-deep:     #6B7B8D;   /* 深冰 — 冬季标签文字 */
  --ice-deep-rgb: 107,123,141;
  --frost:        #E8EEF4;   /* 霜白 — 冬季区底色 */
  --frost-rgb:    232,238,244;

  /* === 木质中性 === */
  --bark:         #5C3A24;   /* 树皮棕 — 深色文字、边框 */
  --bark-rgb:     92,58,36;
  --bark-dark:    #2E1B0E;   /* 深木 — 标题、导航 */
  --bark-dark-rgb: 46,27,14;
  --cream:        #FDF8F2;   /* 奶油底 — 全局背景 */
  --cream-rgb:    253,248,242;

  /* === 基础 === */
  --white:        #FFFCF5;
  --white-rgb:    255,252,245;
  --text:         #2B1B10;
  --text-light:   #6B5540;
  --text-muted:   #9B8A78;
}
```

**色温过渡策略**：页面从上到下，CSS `background` 渐变从暖金→奶油→霜白→冰蓝，产生从秋入冬的叙事感。

---

## 3. Typography Rules

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

/* 标题：衬线 · 在地人文感 */
--font-heading: "Noto Serif SC", "STSong", "SimSun", serif;

/* 正文/UI：无衬线 · 轻奢现代 */
--font-body:    "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
```

| 层级 | 字体 | 字号 | 字重 | 行高 | 字距 |
|------|------|------|------|------|------|
| H1 Hero | Serif SC | clamp(3rem,7vw,5.5rem) | 700 | 1.1 | 0.12em |
| H2 Section | Serif SC | clamp(1.6rem,2.8vw,2.2rem) | 600 | 1.2 | 0.04em |
| H3 Card | Serif SC | 1.1rem | 600 | 1.3 | 0.03em |
| Body | Sans SC | 0.92rem | 400 | 1.9 | 0.02em |
| Caption/Label | Sans SC | 0.7rem | 500 | 1.5 | 0.06em |
| Nav Link | Sans SC | 0.78rem | 400 | 1.0 | 0.03em |

**禁止字体**：Arial, Helvetica, Times New Roman（太普通）；Dancing Script / Pacifico（太甜腻）

**文字装饰**：H1 不加渐变（衬线体本身够强），H2 不加投影，保持克制。

---

## 4. Component Stylings

### 4.1 导航栏 — 木屋轻奢风

```
┌──────────────────────────────────────────────────┐
│  [🎨卡通白桦手礼]  默默禾你    诺瓦·溪闻·打卡·影像·联系  │
│   (SVG小图标)    (logo)         (nav links)       │
└──────────────────────────────────────────────────┘
```

- **结构**：左图标 + logo + 右菜单链接
- **图标**：手绘感白桦树皮工艺品 SVG（圆角、温暖线条、桦树眼纹理）
- **背景**：Hero 区透明（白字+阴影）；滚出后毛玻璃 `backdrop-filter: blur(16px)` + 奶油底 90% 透明
- **Height**：68px，图标区 40×40px 圆角盒子
- **Hover**：菜单链接 hover 变金色 + 底部淡金下划线滑入
- **状态**：当前 section 对应链接加金色点标记

### 4.2 按钮

| 类型 | 背景 | 边框 | 文字 | Hover |
|------|------|------|------|-------|
| Primary | var(--amber) | 同色 | var(--bark-dark) | → --amber-deep，上浮 3px + 阴影 |
| Ghost | transparent | rgba(255,252,245,0.22) | rgba(255,252,245,0.85) | 边框变亮，上浮 3px |
| Card link | var(--cream) | rgba(139,74,27,0.08) | var(--text) | 边框→金色，上浮 1px |

所有按钮：`border-radius: 50px`（胶囊），`padding: 14-16px 32-36px`，`transition: all 0.5s cubic-bezier(0.4,0,0.2,1)`

### 4.3 卡片

- **打卡卡片**：白底 + 1px 淡边 + 8px 圆角，hover 上浮 5px + 阴影加深 + 边框变金
- **民宿故事卡片**：无卡片容器，图+文分栏

### 4.4 弹幕留言

- **样式**：半透明奶油条 `rgba(253,248,242,0.85)` + backdrop-blur + 圆角 50px
- **动画**：从右到左匀速飘过（CSS animation: translateX），持续时间 15-25s 不等
- **内容**：预设 + 模拟实时留言（"诺瓦木屋的晨雾太美了！🌄" / "冬天去禾木滑雪住溪闻" 等）
- **位置**：固定在页面底部或 Hero 区中下部，不遮挡核心内容
- **交互**：hover 暂停 + 微微放大

---

## 5. Layout Principles

**网格**：CSS Grid 为主，2 列故事区（图+文），4 列打卡/联系区
**容器宽度**：`max-width: 1200px`（wider sections），`max-width: 720px`（narrow card sections）
**间距梯度**：4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px / 100px
**Section 间距**：`padding: 100px 36px`，移动端降为 `80px 24px`

---

## 6. Depth & Elevation

```css
/* 阴影体系 — 轻奢克制，不浮夸 */
--shadow-card:  0 4px 20px rgba(46,27,14,0.04);
--shadow-card-hover: 0 14px 40px rgba(46,27,14,0.1);
--shadow-nav:   0 1px 0 rgba(92,58,36,0.06);
--shadow-btn:   0 12px 32px rgba(139,74,27,0.35);

/* 不使用多层叠加阴影，保持干净 */
```

---

## 7. Animation & Interaction

**档位**：L2 流畅交互

| 类别 | 实现 | 详情 |
|------|------|------|
| **Hero 大标题** | CSS `@keyframes` fadeInUp | 加载时 0.8s 淡入上浮 |
| **Hero 背景** | CSS `@keyframes` Ken Burns | 20s 循环 scale(1) → (1.08) |
| **滚动 reveal** | IntersectionObserver + CSS class toggle | `translateY(32px)` → 0，0.8s ease-out |
| **导航滚动态** | JS scroll listener → class toggle | 滚出 Hero 后切换 bg + shadow + 文字颜色 |
| **卡片 hover** | CSS `:hover` transform + shadow | scale(1.03) / translateY(-5px) |
| **鼠标聚光灯** | CSS `radial-gradient` 跟随 `--mx/--my` | Hero 区使用，rAF 节流 |
| **弹幕飘动** | CSS `@keyframes` translateX | 多条不同速度，hover 暂停 |
| **图片视差** | CSS `transform: translateY` JS 驱动 | 轻微偏移（speed 0.15） |

**性能红线**：
- ❌ 禁用 `filter: blur()` on moving elements
- ✅ `backdrop-filter: blur()` ≤ 14px
- ✅ pointermove 用 rAF 节流
- ✅ `prefers-reduced-motion` 降级：禁用所有动画，直接显示

---

## 8. Do's and Don'ts

### ✅ Do
1. 所有颜色通过 CSS 变量引用，禁止硬编码 hex
2. 图片用实际禾木照片，不用纯色占位
3. 按钮/链接必须有 hover + focus 可见态
4. 中文字体 Noto Serif/Sans SC 在前，英文字体 fallback 在后
5. 行高 ≥ 1.7，正文字号 ≥ 15px
6. 移动端横向无溢出，触摸目标 ≥ 44×44px
7. 弹幕内容用真实用户评论风格，不用 Lorem Ipsum
8. 导航栏 logo 图标必须手绘感，不用 emoji

### ❌ Don't
1. 不要用纯色块做 Hero 背景（已踩坑）
2. 不要把所有文字挤在中间窄列
3. 不要用 SVG 地图（已踩坑）
4. 不要用 emoji 做导航图标
5. 不要用 Arial/Helvetica 做中文字体
6. 不要用 `box-shadow` 做过多层次（超过 2 层显脏）
7. 不要用渐变文字（标题衬线体已够强）
8. 不要加 loading screen / splash page
9. 弹幕不要遮挡 CTA 按钮和核心文案

---

## 9. Responsive Behavior

| 断点 | 策略 |
|------|------|
| **Desktop** (≥901px) | 完整 2 列故事、4 列卡片、弹幕 6 条 |
| **Tablet** (601-900px) | 故事区 1 列（图在上）、卡片 2 列、弹幕 3 条 |
| **Mobile** (≤600px) | 单列布局、Hero 字号缩小、卡片 1-2 列、弹幕 2 条、无鼠标聚光灯 |

- 导航栏移动端隐藏菜单链接（仅显示 logo + 图标）
- 弹幕在移动端缩小字号 + 减少条数
- 所有触摸目标 ≥ 44×44px
