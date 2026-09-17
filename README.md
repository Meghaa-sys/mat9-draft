# 🟡 MAKEATON 9.0 — Hero Section

> **South India's Largest Hiring Hackathon** — A pixel-accurate, art-directed web hero section with retro-comic × modern UI aesthetics.

---

## 📸 Design Overview

The hero section is a **full-viewport single-page experience** built to precisely replicate a hand-crafted reference design. The aesthetic blends **premium retro-comic illustration** with **clean modern UI/UX**, creating an immediate visual impact at first load.

```
┌─────────────────────────────────────────────────────┐
│  TAPE BANNER ─ scrolling marquee (top)               │
│─────────────────────────────────────────────────────│
│  NAV ── Logo ──────────── Links ── Register CTA      │
│                                                     │
│  [Grid]  MAKEATON             ★ doodles             │
│          9.0 (huge logo)       ✦ stars              │
│          tagline pill          ✈ paper plane         │
│                                                     │
│  [Date card] [Venue card]   countdown tiles         │
│─────────────────────────────────────────────────────│
│  TAPE BANNER ─ scrolling marquee (bottom)            │
└─────────────────────────────────────────────────────┘
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
| **Logo / Comic** | `Bangers` (Google Fonts) | 400 (display) | MAKEATON 9.0 logo |
| **Display / Headings** | `Archivo Black` | 900 | section labels, bold UI |
| **Body / UI** | `Plus Jakarta Sans` | 400–700 | all readable content |
| **Monospace / Counters** | `Space Grotesk` | 500–700 | countdown numbers, code |

> All fonts loaded via **Google Fonts CDN** in `index.html`.

---

## 🏗️ Project Structure

```
mat 9/
├── index.html          # Full semantic page structure + inline SVG assets
├── style.css           # Complete design system (1 163 lines)
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
Two layered organic shapes in the **top-left corner**, built with SVG `<path>` elements:

```
Layer 1 (amber shadow): #F3B700  — offset slightly down-right, gives 3D depth
Layer 2 (main blob):    #FFD200  — bright yellow, fluid wavy silhouette
```
Each blob contains embedded **halftone dot patterns** (`<circle>` grids inside `<defs>`) and a subtle **hand-drawn grid** for texture.

### 2. MAKEATON 9.0 Logo
Three-layer SVG text treatment:

```
Layer 1 (offset shadow): Black fill, offset +4px right +4px down
Layer 2 (outline):        Black stroke (~8px), no fill
Layer 3 (fill):           #FFD200 solid yellow
```
Font family: `Bangers` — condensed, bold, comic-book feel.

### 3. Tape Strips (Top & Bottom)
- Positioned `absolute`, rotated `±2–3deg`, spanning `110%` width.
- Yellow (`#FFD200`) background with `2px solid black` borders top and bottom.
- Content is a **CSS `@keyframes` marquee** scrolling left indefinitely.
- Text: `MAKE-A-TON  ×  ODOO   +   9TH EDITION   +` (repeated ~10×).

### 4. Decorative Doodles
All rendered as inline `<svg>` elements, absolutely positioned:

| Doodle | Shape | Color | Position |
|--------|-------|-------|----------|
| Stars (×3) | 6-point / 4-point star paths | Black / Yellow | scattered right side |
| Plus marks | `+` strokes | Black | corners and edges |
| Circle outlines | stroke-only circles | Black | accent positions |
| Swirl | spiral path | Black | lower-left area |
| Slash marks | 3× diagonal lines | Black | beside logo |

### 5. Paper Airplane + String
- Airplane: SVG polygon/path at `translate(1165, 230)` inside the background SVG.
- String: SVG `<path>` cubic bezier from the airplane to a **fixed anchor on the left blob**.
- **Mouse parallax**: on `mousemove`, the plane rotates on its anchor using `setAttribute('transform', ...)`.

### 6. Info Cards (Dates + Venue)
Pill-shaped cards with:
```css
background:    #FFFDF9
border:        2px solid #000
border-radius: 999px  /* full pill */
box-shadow:    4px 4px 0 #000  /* hard offset comic shadow */
```
Each card has a **badge tab** (yellow label, e.g. `DATES`) clipped to the left end, plus an icon + text value.

### 7. Countdown Timer Tiles
Four yellow tiles (`DAYS / HRS / MIN / SEC`):
```css
background: #FFE24A
border:     2.5px solid #000
box-shadow: 3px 3px 0 #000
font:       Space Grotesk, 700, 2rem+
```
Driven by `setInterval(tickCountdown, 1000)` in `main.js`.

### 8. Side Coordinate Grids
Two `6×5` CSS grids blended into the background corners (`top-left`, `bottom-right`):
- Cells have `1px solid rgba(0,0,0,0.08)` borders — nearly invisible.
- On `mouseenter`: cell gets a subtle warm-beige tint (`rgba(200,180,100,0.12)`).
- Fades out after `500ms` on `mouseleave`. No bright colors. Minimal by design.

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
// Counts down from a fixed future timestamp
let totalSeconds = (39 * 24 * 3600) + (1 * 3600) + (30 * 60) + 24;
setInterval(tickCountdown, 1000);
```
Updates `#daysValue`, `#hoursValue`, `#minutesValue`, `#secondsValue` every second with zero-padded strings.

#### 2. Interactive Side Grids
```js
initInteractiveGrid('gridTopLeft', 6, 5);    // top-left corner
initInteractiveGrid('gridBottomRight', 6, 5); // bottom-right corner
```
Dynamically creates `30` div cells per grid. Hover/click triggers a minimal class toggle with CSS transition.

#### 3. Mouse Parallax + Paper Plane
```js
hero.addEventListener('mousemove', (e) => {
  // Normalizes cursor to [-0.5, 0.5] on both axes
  // Rotates plane SVG group: rot = -15 + (x * 12) + (y * 6)
  // Translates each .doodle element at varying depths (6–24px)
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
| **Hard offset shadows** | Core to the retro-comic visual language (no blur, just translate) |
| **`canvas-confetti`** | Lightweight (~12KB) celebratory delight on registration |
| **Grid cells in JS** | Allows dynamic creation without polluting HTML markup |
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
