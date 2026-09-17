// ==========================================================================
// COUNTDOWN TIMER LOGIC
// ==========================================================================

const daysEl = document.getElementById('daysValue');
const hoursEl = document.getElementById('hoursValue');
const minutesEl = document.getElementById('minutesValue');
const secondsEl = document.getElementById('secondsValue');

let totalSeconds = (39 * 24 * 3600) + (1 * 3600) + (30 * 60) + 24;

function renderCountdown() {
  const days    = Math.floor(totalSeconds / (24 * 3600));
  const hours   = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (daysEl)    daysEl.textContent    = String(days).padStart(2, '0');
  if (hoursEl)   hoursEl.textContent   = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

function tickCountdown() {
  if (totalSeconds > 0) { totalSeconds--; renderCountdown(); }
}

renderCountdown();
setInterval(tickCountdown, 1000);

// ==========================================================================
// INTERACTIVE SIDE COORDINATE GRIDS
// ==========================================================================

function initInteractiveGrid(containerId, cols = 6, rows = 5) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const totalCells = cols * rows;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.dataset.index = i;
    cell.addEventListener('mouseenter', () => cell.classList.add('active'));
    cell.addEventListener('mouseleave', () => setTimeout(() => cell.classList.remove('active'), 500));
    cell.addEventListener('click', () => {
      cell.classList.add('active');
      setTimeout(() => cell.classList.remove('active'), 600);
    });
    cell.addEventListener('touchstart', () => {
      cell.classList.add('active');
      setTimeout(() => cell.classList.remove('active'), 600);
    }, { passive: true });
    container.appendChild(cell);
  }
}

initInteractiveGrid('gridTopLeft', 6, 5);
initInteractiveGrid('gridBottomRight', 6, 5);

// ==========================================================================
// DESKTOP PARALLAX & CONNECTED STRING AIRPLANE
// ==========================================================================

const hero = document.getElementById('hero');
const paperPlaneVector = document.getElementById('paperPlaneVector');
const doodles = document.querySelectorAll('.doodle');

if (hero) {
  hero.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return;
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    if (paperPlaneVector) {
      const rot = -15 + (x * 12) + (y * 6);
      paperPlaneVector.setAttribute('transform', `translate(1165, 230) rotate(${rot})`);
    }
    doodles.forEach((doodle, idx) => {
      const depth = ((idx % 4) + 1) * 6;
      doodle.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    if (paperPlaneVector) paperPlaneVector.setAttribute('transform', 'translate(1165, 230) rotate(-15)');
    doodles.forEach(d => d.style.transform = 'translate(0, 0)');
  });
}

// ==========================================================================
// TOUCH & TAP INTERACTIONS (SPARKLES & DOODLE POPPING)
// ==========================================================================

// Spawn a 4-point sparkle SVG at (x, y) viewport position
function spawnSparkle(x, y) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.classList.add('tap-sparkle');
  svg.style.left = x + 'px';
  svg.style.top  = y + 'px';
  const isYellow = Math.random() > 0.5;
  const fill   = isYellow ? '#FFD200' : '#111111';
  const stroke = isYellow ? '#111111' : 'none';
  svg.innerHTML = `<path d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z"
                        fill="${fill}" stroke="${stroke}" stroke-width="0.8"/>`;
  document.body.appendChild(svg);
  svg.addEventListener('animationend', () => svg.remove(), { once: true });
}

// Pop animation on a doodle/dot element — also flashes SVG fill for blink effect
function popDoodle(el) {
  el.classList.remove('touch-pop');
  void el.offsetWidth; // force reflow to restart animation
  el.classList.add('touch-pop');

  // Flash SVG paths: yellow → black → original (blink)
  const paths = el.querySelectorAll('path, circle, polygon, line');
  paths.forEach(p => {
    const orig = p.getAttribute('fill') || p.getAttribute('stroke');
    if (!orig || orig === 'none') return;
    const isStroke = p.getAttribute('fill') === 'none';
    const attr = isStroke ? 'stroke' : 'fill';
    p.setAttribute(attr, '#FFD200');
    setTimeout(() => p.setAttribute(attr, '#111111'), 120);
    setTimeout(() => p.setAttribute(attr, '#FFD200'), 240);
    setTimeout(() => p.setAttribute(attr, orig),     360);
  });

  el.addEventListener('animationend', () => el.classList.remove('touch-pop'), { once: true });
}

// 1. Individual doodle elements (stars, circles, dots) - touch & click
doodles.forEach(el => {
  el.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    popDoodle(el);
    const t = e.touches[0];
    if (t) spawnSparkle(t.clientX, t.clientY);
  }, { passive: true });

  el.addEventListener('click', (e) => {
    popDoodle(el);
    spawnSparkle(e.clientX, e.clientY);
  });
});

// 2. Background tap → cluster of sparkles at finger position
if (hero) {
  hero.addEventListener('touchstart', (e) => {
    const tag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
    const cl  = (e.target.className && typeof e.target.className === 'string') ? e.target.className : '';
    const skip = ['button', 'input', 'a'].includes(tag) ||
                 cl.includes('register') || cl.includes('info-card') ||
                 cl.includes('tape')     || cl.includes('countdown') ||
                 cl.includes('modal')    || cl.includes('grid-cell') ||
                 cl.includes('doodle')   || cl.includes('halftone');
    if (skip) return;
    const t = e.touches[0];
    if (!t) return;
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const ox = (Math.random() - 0.5) * 30;
      const oy = (Math.random() - 0.5) * 30;
      setTimeout(() => spawnSparkle(t.clientX + ox, t.clientY + oy), i * 55);
    }
  }, { passive: true });
}

// ==========================================================================
// HALFTONE DOT CLUSTERS (yellow dot wave ripples)
// ==========================================================================

function handleHalftoneTouch(cluster, clientX, clientY) {
  const circles = Array.from(cluster.querySelectorAll('circle'));
  const rect  = cluster.getBoundingClientRect();
  const svgW  = rect.width  || 130;
  const svgH  = rect.height || 130;
  const vbSize = 140; // SVG viewBox is 140×140

  // Map touch to SVG viewBox coordinates
  const tx = ((clientX - rect.left) / svgW) * vbSize;
  const ty = ((clientY - rect.top)  / svgH) * vbSize;

  // Sort dots by distance from touch → ripple outward from tap
  const sorted = circles.slice().sort((a, b) => {
    const da = Math.hypot(+a.getAttribute('cx') - tx, +a.getAttribute('cy') - ty);
    const db = Math.hypot(+b.getAttribute('cx') - tx, +b.getAttribute('cy') - ty);
    return da - db;
  });

  // Animate each dot with a staggered delay — ripple wave
  sorted.forEach((circle, i) => {
    const origFill = circle.getAttribute('fill') || '#F8BC02';
    setTimeout(() => {
      circle.style.transition = 'fill 0.1s ease, transform 0.18s ease';
      circle.style.transformOrigin = `${circle.getAttribute('cx')}px ${circle.getAttribute('cy')}px`;
      circle.style.fill = '#FFD200';
      circle.style.transform = 'scale(1.6)';
      setTimeout(() => {
        circle.style.fill = origFill;
        circle.style.transform = 'scale(1)';
      }, 200);
    }, i * 25);
  });

  spawnSparkle(clientX, clientY);
}

document.querySelectorAll('.halftone-cluster').forEach(cluster => {
  cluster.addEventListener('touchstart', function(e) {
    e.stopPropagation();
    const touch = e.touches[0];
    if (touch) {
      handleHalftoneTouch(cluster, touch.clientX, touch.clientY);
    }
  }, { passive: true });

  cluster.addEventListener('click', function(e) {
    handleHalftoneTouch(cluster, e.clientX, e.clientY);
  });
});

// ==========================================================================
// REGISTRATION BUTTON & MODAL
// ==========================================================================

const registerBtn  = document.getElementById('registerBtn');
const regModal     = document.getElementById('regModal');
const modalClose   = document.getElementById('modalClose');
const registerForm = document.getElementById('registerForm');

function fireConfetti() {
  try {
    const c = window.confetti;
    if (typeof c === 'function') {
      c({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FFD200', '#FF4768', '#000000', '#FFFFFF']
      });
    }
  } catch (err) { /* silent */ }
}

if (registerBtn && regModal) {
  registerBtn.addEventListener('click', () => {
    fireConfetti();
    regModal.classList.add('active');
    regModal.setAttribute('aria-hidden', 'false');
  });
}

if (modalClose && regModal) {
  modalClose.addEventListener('click', () => {
    regModal.classList.remove('active');
    regModal.setAttribute('aria-hidden', 'true');
  });
  regModal.addEventListener('click', (e) => {
    if (e.target === regModal) {
      regModal.classList.remove('active');
      regModal.setAttribute('aria-hidden', 'true');
    }
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', () => {
    fireConfetti();
    setTimeout(() => {
      alert('🎉 Registration successful! See you at MAKEATON 9.0 at CUSAT on 19th & 20th December!');
      regModal.classList.remove('active');
      regModal.setAttribute('aria-hidden', 'true');
    }, 400);
  });
}
