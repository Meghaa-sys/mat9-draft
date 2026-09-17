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
