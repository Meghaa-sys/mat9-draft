import confetti from 'canvas-confetti';

// ==========================================================================
// COUNTDOWN TIMER LOGIC (INITIALIZED WITH 39 DAYS, 01 HRS, 30 MIN, 24 SEC)
// ==========================================================================

const daysEl = document.getElementById('daysValue');
const hoursEl = document.getElementById('hoursValue');
const minutesEl = document.getElementById('minutesValue');
const secondsEl = document.getElementById('secondsValue');

// Target initial values matching reference: 39d 01h 30m 24s
let totalSeconds = (39 * 24 * 3600) + (1 * 3600) + (30 * 60) + 24;

function renderCountdown() {
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

function tickCountdown() {
  if (totalSeconds > 0) {
    totalSeconds--;
    renderCountdown();
  }
}

// Initial render & live tick
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

    // Minimal subtle interaction: gentle color change
    cell.addEventListener('mouseenter', () => {
      cell.classList.add('active');
    });

    cell.addEventListener('mouseleave', () => {
      setTimeout(() => {
        cell.classList.remove('active');
      }, 500);
    });

    // On click: gentle pulse/color change, no bright blocks, no confetti
    cell.addEventListener('click', () => {
      cell.classList.add('active');
      setTimeout(() => {
        cell.classList.remove('active');
      }, 600);
    });

    container.appendChild(cell);
  }
}

initInteractiveGrid('gridTopLeft', 6, 5);
initInteractiveGrid('gridBottomRight', 6, 5);

// ==========================================================================
// INTERACTIVE PARALLAX & CONNECTED STRING AIRPLANE
// ==========================================================================

const hero = document.getElementById('hero');
const paperPlaneVector = document.getElementById('paperPlaneVector');
const doodles = document.querySelectorAll('.doodle');

if (hero && window.matchMedia('(min-width: 1024px)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (paperPlaneVector) {
      // Subtle pitch while maintaining string attachment at (1165, 230)
      const rot = -15 + (x * 12) + (y * 6);
      paperPlaneVector.setAttribute('transform', `translate(1165, 230) rotate(${rot})`);
    }

    doodles.forEach((doodle, idx) => {
      const depth = ((idx % 4) + 1) * 6;
      doodle.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    if (paperPlaneVector) {
      paperPlaneVector.setAttribute('transform', 'translate(1165, 230) rotate(-15)');
    }
    doodles.forEach((doodle) => {
      doodle.style.transform = 'translate(0, 0)';
    });
  });
}

// ==========================================================================
// REGISTRATION BUTTON & MODAL
// ==========================================================================

const registerBtn = document.getElementById('registerBtn');
const regModal = document.getElementById('regModal');
const modalClose = document.getElementById('modalClose');
const registerForm = document.getElementById('registerForm');

function fireConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFD200', '#FF4768', '#000000', '#FFFFFF']
    });
  } catch (err) {
    console.log('Confetti triggered', err);
  }
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
// ==========================================================================
// MOBILE TOUCH INTERACTIONS — DOODLES, DOTS & BACKGROUND SPARKLES
// ==========================================================================

if (window.matchMedia('(max-width: 768px)').matches) {

  // Helper: spawn a sparkle SVG at (x, y) in viewport coords
  function spawnSparkle(x, y) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.classList.add('tap-sparkle');
    svg.style.left = x + 'px';
    svg.style.top  = y + 'px';
    const isYellow = Math.random() > 0.5;
    const fill   = isYellow ? '#FFD200' : '#111111';
    const stroke = isYellow ? '#111111' : 'none';
    svg.innerHTML = '<path d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="0.8"/>';
    document.body.appendChild(svg);
    svg.addEventListener('animationend', () => svg.remove(), { once: true });
  }

  // Helper: pop animation on a doodle element
  function popDoodle(el) {
    el.classList.remove('touch-pop');
    void el.offsetWidth;
    el.classList.add('touch-pop');
    el.addEventListener('animationend', () => el.classList.remove('touch-pop'), { once: true });
  }

  // 1. Touch individual doodle stars & circles
  document.querySelectorAll('.doodle').forEach(el => {
    el.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      popDoodle(el);
      const t = e.touches[0];
      spawnSparkle(t.clientX, t.clientY);
    }, { passive: true });
  });

  // 2. Background tap -> cluster of sparkles at touch point
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('touchstart', (e) => {
      const tag = e.target.tagName.toLowerCase();
      const cl  = (e.target.className && typeof e.target.className === 'string') ? e.target.className : '';
      const skip = ['button','input','a'].includes(tag) ||
                   cl.includes('register') || cl.includes('info-card') ||
                   cl.includes('tape') || cl.includes('countdown') ||
                   cl.includes('modal') || cl.includes('grid-cell') ||
                   cl.includes('doodle');
      if (skip) return;
      const t = e.touches[0];
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const ox = (Math.random() - 0.5) * 30;
        const oy = (Math.random() - 0.5) * 30;
        setTimeout(() => spawnSparkle(t.clientX + ox, t.clientY + oy), i * 55);
      }
    }, { passive: true });
  }

}
