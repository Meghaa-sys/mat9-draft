# 🟡 MAKEATON 9.0 — Hero Section

> **South India's Largest Hiring Hackathon** — A pixel-accurate, art-directed web hero section with retro-comic × modern UI aesthetics.

---

## 📸 Design Overview

The hero section is a **full-viewport single-page experience** built to precisely replicate a hand-crafted reference design. The aesthetic blends **premium retro-comic illustration** with **clean modern UI/UX**, creating an immediate visual impact at first load.

**Desktop layout:**
```
┌─────────────────────────────────────────────────────┐
│  TAPE BANNER ─ scrolling marquee (top)               │
│─────────────────────────────────────────────────────│
│  [Grid]  MAKEATON             ★ doodles             │
│          9.0 (huge logo)       ✦ stars              │
│          tagline pill          ✈ paper plane         │
│                                                     │
│  [Date card] [Venue card]   countdown tiles         │
│─────────────────────────────────────────────────────│
│  TAPE BANNER ─ scrolling marquee (bottom)            │
└─────────────────────────────────────────────────────┘
```

**Mobile layout (≤768px):**
```
┌────────────────────────────┐
│  TAPE BANNER (top)          │
│  🟡 yellow blob top         │
│                            │
│  MAKEATON                  │  ← logo pushed down from blob
│    9.0                     │
│  SOUTH INDIA'S LARGEST...  │  ← tagline hugs logo
│                            │
│  [DATES │──] [VENUE │──]   │  ← one-line side-by-side cards
│  REGISTRATION CLOSES IN    │
│  [39][01][30][24]          │
│  DEADLINE: 31 OCT 2026     │
│  [ REGISTER → ]            │
│                            │
│  🟡 yellow blob bottom      │
│  TAPE BANNER (bottom)       │
└────────────────────────────┘
```

---

## 🎨 Color Palette

| Role | Name | Hex | Swatch |
|------|------|-----|--------|
| **Background** | Cream Paper | `#FCF8ED` | warm off-white |
| **Brand Primary** | Make-A-Ton Yellow | `#FFD200` | vibrant yellow |
| **Brand Light** | Yellow Light | `#FFE24A` | light yellow |
| **Brand Deep** | Yellow Deep / Amber | `#F3B700` | amber shadow |
| **Text / Outlines** | Brand Black | `#000000` | pure black |
| **Accent** | Coral Pink | `#FF4768` | hot pink-red |
| **Accent Shadow** | Deep Pink | `#FF3359` | dark pink shadow |
| **Card Background** | Warm White | `#FFFDF9` | warm card base |
| **Grid Dots** | Subtle Dot | `#E8E1CD` | light beige dot |
| **Interactive Cell Hover** | Warm Beige | `#EDE5CA` | subtle hover tint |

### CSS Variables (`:root`)

```css
--bg-cream:           #FCF8ED;   /* page background */
--brand-yellow:       #FFD200;   /* tapes, blobs, highlights */
--brand-yellow-light: #FFE24A;   /* countdown tiles, glow */
--brand-yellow-deep:  #F3B700;   /* blob shadows, amber offset */
--brand-black:        #000000;   /* text, borders, outlines */
--brand-pink:         #FF4768;   /* accent elements, CTA shadow */
--brand-pink-shadow:  #FF3359;   /* deeper pink shadow */
--card-bg:            #FFFDF9;   /* info cards background */
```

---

## 🔤 Typography System

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Logo / Comic** | `Lilita One` + `Bangers` (Google Fonts) | 400 (display) | MAKEATON 9.0 logo |
| **Display / Headings** | `Archivo Black` | 900 | section labels, bold UI |
| **Body / UI** | `Plus Jakarta Sans` | 400–700 | all readable content |
| **Monospace / Counters** | `Space Grotesk` | 500–700 | countdown numbers |

> All fonts loaded via **Google Fonts CDN** in `index.html`.

---

## 🏗️ Project Structure

```
mat 9/
├── index.html          # Full semantic page structure + inline SVG assets
├── style.css           # Complete design system (~1 200 lines)
├── main.js             # Interactive logic (countdown, parallax, modal)
├── package.json        # Vite dev server + canvas-confetti dependency
├── package-lock.json   # Lockfile
├── .gitignore          # Excludes node_modules/ and dist/
└── README.md           # You are here
```

---

## 🖼️ Visual Asset Breakdown

All visual assets are **rendered inline as SVG** inside `index.html` — zero external image files required.

### 1. Background Blob System
Four organic yellow shapes (top-left, top-right, bottom-left, bottom-right) built with SVG `<path>` elements:

```
Layer 1 (amber shadow): #F3B700  — offset slightly down-right, gives 3D depth
Layer 2 (main blob):    #FFD200  — bright yellow, fluid wavy silhouette
```
Each blob contains embedded **halftone dot patterns** and a subtle hand-drawn outline stroke.

### 2. MAKEATON 9.0 Logo
Pure CSS text treatment — **no SVG images**, fully scalable:

```css
/* MAKEATON — fills width, comic book 3D block shadow */
font-family: 'Lilita One', 'Bangers', cursive;
color: #FFD200;                          /* yellow fill */
-webkit-text-stroke: 6px #000;           /* thick black outline */
paint-order: stroke fill;               /* stroke renders under fill */
text-shadow:
  2px 2px 0 #000, 4px 4px 0 #000,       /* diagonal stacked block shadow */
  6px 6px 0 #000, 8px 8px 0 #000,       /* creates solid 3D depth */
  10px 10px 0 #000, 12px 12px 0 #000,
  14px 14px 0 #000, 15px 15px 0 #000;
```

> `paint-order: stroke fill` is the critical property — it renders the stroke *under* the yellow fill so the full yellow colour is visible (no fill-eaten-by-stroke problem).

### 3. Tape Strips (Top & Bottom)
- Positioned `absolute`, rotated `±2–3deg`, spanning `110%` width.
- Yellow (`#FFD200`) background with `2px solid black` borders top and bottom.
- Content is a **CSS `@keyframes` marquee** scrolling left indefinitely.
- Text: `MAKE-A-TON  ×  ODOO   +   9TH EDITION   +` (repeated ~10×).

### 4. Decorative Doodles
All rendered as inline `<svg>` elements, absolutely positioned:

| Doodle | Shape | Color | Position |
|--------|-------|-------|----------|
| Stars (×3) | 4-point sparkle paths | Black / Yellow | scattered corners |
| Plus marks | `+` strokes | Black | corners and edges |
| Circle outlines | stroke-only circles | Black | accent positions |
| Swirl | spiral path | Black | lower-left area |
| Slash marks | 3× diagonal lines | Black | beside logo |

### 5. Paper Airplane + String
- Airplane: SVG polygon/path at `translate(1165, 230)` inside the background SVG.
- String: SVG `<path>` cubic bezier from the airplane to a fixed anchor point.
- **Mouse parallax**: on `mousemove`, the plane rotates on its anchor. Disabled on mobile.

### 6. Info Cards (Dates + Venue)

**Desktop:** Side-by-side pill-shaped cards.

**Mobile:** Still side-by-side in **one row** (`flex-direction: row`), with truncated text (`text-overflow: ellipsis`) so both fit within the screen width without wrapping.

```css
/* Mobile card layout */
.info-cards-row  { flex-direction: row; flex-wrap: nowrap; }
.info-card       { flex: 1 1 0; min-width: 0; }
.card-value      { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
```

### 7. Countdown Timer Tiles
Four yellow tiles (`DAYS / HRS / MIN / SEC`):
```css
background: #FFE24A
border:     2.5px solid #000
box-shadow: 3px 3px 0 #000
font:       Space Grotesk, 700
```
Driven by `setInterval(tickCountdown, 1000)` in `main.js`.

### 8. Side Coordinate Grids
Two `6×5` CSS grids blended into the background corners (`top-left`, `bottom-right`):
- Cells have `1px solid rgba(0,0,0,0.08)` borders — nearly invisible.
- On `mouseenter`: cell gets a subtle warm-beige tint (`rgba(200,180,100,0.12)`).
- **Hidden on mobile** (`display: none` at ≤768px) for cleaner focus.

---

## 📐 Responsive Spacing System (Mobile)

The mobile layout uses a deliberate **three-zone composition**:

```
Zone 1 — TOP YELLOW BLOB (background)
         ↕ 52px gap (margin-top on logo-wrapper)
Zone 2 — LOGO BLOCK: MAKEATON + 9.0
         ↕ 16px gap (logo-wrapper margin-bottom)
         SOUTH INDIA'S LARGEST HIRING HACKATHON (tagline, hugs logo)
         ↕ 60px gap (tagline-pill-container margin-bottom)
Zone 3 — EVENT INFO: Cards + Countdown + Register
         ↕ natural gap
Zone 4 — BOTTOM YELLOW BLOB (background)
```

Key mobile spacing values:

| Element | Property | Value |
|---------|----------|-------|
| Logo from top blob | `logo-wrapper margin-top` | `52px` |
| Logo to tagline | `logo-wrapper margin-bottom` | `16px` |
| Tagline to cards | `tagline-pill-container margin-bottom` | `60px` |
| Info card gap | `info-cards-row gap` | `8px` |
| Cards to countdown | `info-cards-row margin-bottom` | `16px` |

---

## ⚙️ How It Works

### Dev Server
```bash
npm install          # install Vite + canvas-confetti
npm run dev          # starts at http://localhost:5173
```

### JavaScript Modules (`main.js`)

#### 1. Live Countdown Timer
```js
let totalSeconds = (39 * 24 * 3600) + (1 * 3600) + (30 * 60) + 24;
setInterval(tickCountdown, 1000);
```
Updates `#daysValue`, `#hoursValue`, `#minutesValue`, `#secondsValue` every second with zero-padded strings.

#### 2. Interactive Side Grids
```js
initInteractiveGrid('gridTopLeft', 6, 5);
initInteractiveGrid('gridBottomRight', 6, 5);
```
Dynamically creates `30` div cells per grid. Hover/click triggers a minimal class toggle with CSS transition. Hidden on mobile.

#### 3. Mouse Parallax + Paper Plane
```js
hero.addEventListener('mousemove', (e) => {
  // rot = -15 + (x * 12) + (y * 6)
  paperPlaneVector.setAttribute('transform', `translate(1165, 230) rotate(${rot})`);
  doodles.forEach((d, i) => d.style.transform = `translate(${x * depth}px, ${y * depth}px)`);
});
```
Only active on `min-width: 1024px` to avoid mobile jank.

#### 4. Register Button → Modal + Confetti
```js
registerBtn.addEventListener('click', () => {
  fireConfetti(); // canvas-confetti burst in brand colors
  regModal.classList.add('active');
});
```
Modal is accessible (`aria-hidden` toggled). Backdrop click closes it.

---

## 🌐 Deployment

Hosted on GitHub: **https://github.com/Meghaa-sys/mat9-draft**

### Enable GitHub Pages (Recommended)
1. Go to **Settings → Pages** in the repo.
2. Set source to **GitHub Actions**.
3. Add a workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🧩 Design Decisions

| Decision | Reasoning |
|----------|-----------|
| **Inline SVG over PNG/JPG** | Zero HTTP requests, infinite scalability, easy JS manipulation |
| **Vite (no framework)** | Minimal bundle, fast HMR, no React/Vue overhead needed |
| **CSS custom properties** | Single source of truth for all color and typography tokens |
| **`paint-order: stroke fill`** | Ensures yellow fill renders over the black stroke cleanly |
| **Diagonal block shadow** | `Npx Npx 0 #000` stacked layers = true comic 3D depth, not a blur |
| **`canvas-confetti`** | Lightweight (~12KB) celebratory delight on registration |
| **Grid cells in JS** | Dynamic creation, hidden on mobile without HTML clutter |
| **Cards in one row on mobile** | Reduces vertical congestion; truncation keeps text clean |
| **Three-zone mobile layout** | Logo at top, info at bottom, yellow blobs frame both ends |
| **Marquee via CSS keyframes** | No JS dependency, buttery smooth GPU-composited animation |

---

## 📋 Event Info

| Detail | Value |
|--------|-------|
| **Event** | MAKEATON 9.0 |
| **Edition** | 9th Edition |
| **Co-organiser** | Odoo |
| **Dates** | 19th & 20th December |
| **Venue** | Cochin University of Science and Technology (CUSAT) |
| **Category** | South India's Largest Hiring Hackathon |

---

*Built with ♥ using HTML, CSS, Vanilla JS, and Vite.*
