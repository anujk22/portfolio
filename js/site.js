/* ============================================================
   THE UNDERGROUND – SCROLL SNAP & ANIMATION ENGINE
   Recreates the original Webflow IX2 + GSAP ScrollSmoother
   snap-scroll behavior with section transitions.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger, Observer);

// ===== STATE =====
let currentScreen = 0;   // 0 = preloader, 1–4 = content screens
let locked = false;
let introPlayed = false;
const DURATION = 1.6;
const EASE = "power2.inOut";
const WHEEL_COOLDOWN = 600;

// ===== DOM REFS =====
const $ = (s, p) => (p || document).querySelector(s);
const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

const preloader    = $('.preloader');
const screenParent = $('.screen_parent');
const screens      = $$('.screen');
const scrollEl     = $('.scroll');
const scrollText1  = $('.scroll_text-1');
const scrollText2  = $('.scroll_text-2');
const bottomText4  = $('[data-scroll="bottom-4"]');
const nameImg      = $('.name');
const logoLink     = $('#logo-link');
const lockBtn      = $('#lock-btn');
const formWrapper  = $('.form_wrapper');
const ball         = $('.image-ball');

const topTexts = {
  1: $('[data-scroll="top-1"]'),
  2: $('[data-scroll="top-2"]'),
  3: $('[data-scroll="top-3"]'),
  4: $('[data-scroll="top-4"]'),
};

// ===== CUSTOM CURSOR =====
const cursor    = document.createElement('div');
const cursorDot = document.createElement('div');
cursor.className    = 'custom-cursor';
cursorDot.className = 'custom-cursor-dot';
document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

let mx = -100, my = -100, dx = -100, dy = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  // Ball parallax
  if (ball && currentScreen === 1) {
    const bx = (e.clientX - innerWidth / 2) / 25;
    const by = (e.clientY - innerHeight / 2) / 25;
    ball.style.transform = `translate(${bx}px, ${by}px)`;
  }
});

(function tickCursor() {
  dx += (mx - dx) * 0.15;
  dy += (my - dy) * 0.15;
  cursor.style.left    = mx + 'px';
  cursor.style.top     = my + 'px';
  cursorDot.style.left  = dx + 'px';
  cursorDot.style.top   = dy + 'px';
  requestAnimationFrame(tickCursor);
})();

// Hover grow on interactive elements
$$('a, button, .lock').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '60px';
    cursor.style.height = '60px';
    cursor.style.borderColor = 'var(--orange)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '40px';
    cursor.style.height = '40px';
    cursor.style.borderColor = 'var(--mocco)';
  });
});

// ===== SPLIT-TEXT UTILITY =====
function splitIntoLetters(el) {
  if (el._split) return el._split;
  const raw = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', raw);
  const spans = [];
  for (const ch of raw) {
    const s = document.createElement('span');
    s.className = 'gsap_split_letter';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    el.appendChild(s);
    spans.push(s);
  }
  el._split = spans;
  return spans;
}

function blurIn(el, opts = {}) {
  const letters = el._split || splitIntoLetters(el);
  return gsap.fromTo(letters, 
    { opacity: 0, filter: 'blur(10px)' },
    { opacity: 1, filter: 'blur(0px)',
      duration: opts.dur || 0.5,
      stagger: opts.stagger || 0.03,
      ease: 'power2.out',
      delay: opts.delay || 0 }
  );
}

function blurOut(el, opts = {}) {
  const letters = el._split || splitIntoLetters(el);
  return gsap.to(letters, {
    opacity: 0, filter: 'blur(10px)',
    duration: opts.dur || 0.35,
    stagger: opts.stagger || 0.02,
    ease: 'power2.in',
    delay: opts.delay || 0
  });
}

// Initialize all [data-animation="blur"] elements
$$('[data-animation="blur"]').forEach(splitIntoLetters);
Object.values(topTexts).forEach(el => el && splitIntoLetters(el));

// ===== TOP-TEXT MAP =====
function topTextFor(screen) {
  if (screen <= 1) return 1;
  return screen; // 2→2, 3→3, 4→4
}

// ===== TRANSITION HELPERS =====
function swapTopText(from, to) {
  const fi = topTextFor(from), ti = topTextFor(to);
  if (fi === ti) return gsap.timeline();
  const tl = gsap.timeline();
  if (topTexts[fi]) {
    tl.add(blurOut(topTexts[fi], { dur: 0.3, stagger: 0.012 }), 0);
    tl.set(topTexts[fi], { opacity: 0 }, 0.35);
  }
  if (fi === 2 && nameImg) tl.to(nameImg, { opacity: 0, duration: 0.25 }, 0);
  if (topTexts[ti]) {
    tl.set(topTexts[ti], { opacity: 1 }, 0.4);
    tl.add(blurIn(topTexts[ti], { dur: 0.45, stagger: 0.02 }), 0.42);
  }
  if (ti === 2 && nameImg) tl.to(nameImg, { opacity: 1, duration: 0.4 }, 0.6);
  return tl;
}

function swapScrollText(to) {
  const tl = gsap.timeline();
  if (to === 0) {
    tl.to(scrollText1, { opacity: 1, duration: 0.4 }, 0);
    tl.to(scrollText2, { opacity: 0, duration: 0.3 }, 0);
  } else if (to <= 3) {
    tl.to(scrollText1, { opacity: 0, duration: 0.3 }, 0);
    tl.to(scrollText2, { opacity: 1, duration: 0.4 }, 0);
  } else {
    tl.to(scrollText1, { opacity: 0, duration: 0.3 }, 0);
    tl.to(scrollText2, { opacity: 0, duration: 0.3 }, 0);
  }
  if (bottomText4) {
    tl.to(bottomText4, { opacity: to === 4 ? 1 : 0, duration: 0.4 }, to === 4 ? 0.2 : 0);
  }
  return tl;
}

// ===== SCREEN ANIMATIONS =====
function screenIn(n) {
  const s = $(`[data-screen="${n}"]`);
  if (!s) return gsap.timeline();
  const tl = gsap.timeline();
  tl.set(s, { opacity: 1, visibility: 'visible' });

  const headings = $$('[data-animation="blur"]', s);
  headings.forEach((h, i) => tl.add(blurIn(h, { dur: 0.55, stagger: 0.025 }), 0.1 + i * 0.25));

  const cards = $$('.glass-card', s);
  if (cards.length > 0) {
    tl.fromTo(cards, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.12 }, 
      0.5
    );
  }

  if (n === 4) {
    const lg = $('.lock_group', s);
    const ht1 = $('.heading-text-1', s);
    const ht2 = $('.heading-text-2', s);
    if (lg) tl.fromTo(lg, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.45);
    if (ht1) tl.fromTo(ht1, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.65);
    if (ht2) tl.fromTo(ht2, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.4 }, 0.75);
  }
  return tl;
}

function screenOut(n) {
  const s = $(`[data-screen="${n}"]`);
  if (!s) return gsap.timeline();
  const tl = gsap.timeline();

  const headings = $$('[data-animation="blur"]', s);
  headings.forEach((h, i) => tl.add(blurOut(h, { dur: 0.3, stagger: 0.012 }), i * 0.08));

  const cards = $$('.glass-card', s);
  if (cards.length > 0) {
    tl.to(cards, { opacity: 0, y: -20, duration: 0.35, stagger: 0.05 }, 0);
  }

  if (n === 4) {
    const lg = $('.lock_group', s);
    const ht1 = $('.heading-text-1', s);
    const ht2 = $('.heading-text-2', s);
    if (lg) tl.to(lg, { opacity: 0, duration: 0.35 }, 0.08);
    if (ht1) tl.to(ht1, { opacity: 0, duration: 0.25 }, 0.15);
    if (ht2) tl.to(ht2, { opacity: 0, duration: 0.25 }, 0.15);
  }

  tl.set(s, { opacity: 0, visibility: 'hidden' });
  return tl;
}

// ===== MAIN NAVIGATION =====
function go(target) {
  if (locked || target === currentScreen || target < 0 || target > 4) return;
  locked = true;
  const from = currentScreen;
  const tl = gsap.timeline({
    onComplete() { currentScreen = target; locked = false; }
  });

  // Preloader ↔ Screen transitions
  if (from === 0 && target === 1) {
    // Slide preloader up with skew, reveal screens
    tl.to(preloader, { yPercent: -100, duration: DURATION, ease: EASE }, 0);
    tl.add(screenIn(1), 0.5);
    tl.add(swapTopText(0, 1), 0.3);
    tl.add(swapScrollText(1), 0.4);
  }
  else if (from === 1 && target === 0) {
    tl.add(screenOut(1), 0);
    tl.to(preloader, { yPercent: 0, duration: DURATION, ease: EASE }, 0.4);
    tl.add(swapTopText(1, 0), 0.3);
    tl.add(swapScrollText(0), 0.4);
  }
  else {
    // Between content screens
    tl.add(screenOut(from), 0);
    tl.add(screenIn(target), 0.5);
    tl.add(swapTopText(from, target), 0.15);
    tl.add(swapScrollText(target), 0.3);
  }
}

// ===== INPUT =====
// Wheel (debounced)
let wheelCooldown = false;
document.addEventListener('wheel', e => {
  e.preventDefault();
  if (locked || wheelCooldown) return;
  wheelCooldown = true;
  setTimeout(() => wheelCooldown = false, WHEEL_COOLDOWN);
  go(currentScreen + (e.deltaY > 0 ? 1 : -1));
}, { passive: false, capture: true });

// Touch
let ty0 = 0;
document.addEventListener('touchstart', e => { ty0 = e.touches[0].clientY; }, { passive: true });
document.addEventListener('touchend', e => {
  if (locked) return;
  const diff = ty0 - e.changedTouches[0].clientY;
  if (Math.abs(diff) > 40) go(currentScreen + (diff > 0 ? 1 : -1));
}, { passive: true });

// Keyboard
addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); go(currentScreen + 1); }
  if (e.key === 'ArrowUp')                     { e.preventDefault(); go(currentScreen - 1); }
});

// Logo → preloader
logoLink?.addEventListener('click', e => { e.preventDefault(); go(0); });

// Lock → form
lockBtn?.addEventListener('click', () => {
  if (!formWrapper) return;
  const tl = gsap.timeline();
  tl.to(lockBtn, { scale: 8, opacity: 0, duration: 1, ease: 'power2.inOut' }, 0);
  $$('[data-screen="4"] .heading-absolute').forEach(h => tl.to(h, { opacity: 0, duration: 0.4 }, 0));
  $$('[data-screen="4"] .lock_key').forEach(k => tl.to(k, { opacity: 0, duration: 0.4 }, 0));
  const ap = $('[data-screen="4"] .apply');
  if (ap) tl.to(ap, { opacity: 0, duration: 0.25 }, 0);

  formWrapper.classList.remove('is-hide');
  tl.set(formWrapper, { visibility: 'visible', pointerEvents: 'auto' }, 0.7);
  tl.to(formWrapper, { opacity: 1, duration: 0.5 }, 0.7);

  const fh = $('[data-animation="blur"]', formWrapper);
  if (fh) tl.add(blurIn(fh, { dur: 0.5, stagger: 0.035 }), 0.9);
  const ff = $('.form_fields', formWrapper);
  if (ff) tl.fromTo(ff, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.2);
});

// ===== BOOT =====
function init() {
  // Stack: preloader on top, screens behind
  gsap.set(preloader, { yPercent: 0 });
  gsap.set(screenParent, { yPercent: 0 });

  // All screens hidden
  screens.forEach(s => gsap.set(s, { opacity: 0, visibility: 'hidden' }));

  // Scroll indicator hidden
  gsap.set(scrollEl, { opacity: 0, y: 20 });
  gsap.set(scrollText1, { opacity: 0 });
  gsap.set(scrollText2, { opacity: 0 });
  if (bottomText4) gsap.set(bottomText4, { opacity: 0 });

  // Top texts hidden except #1
  Object.entries(topTexts).forEach(([k, el]) => {
    if (el && k !== '1') gsap.set(el, { opacity: 0 });
  });

  // Intro timeline
  const intro = gsap.timeline({ delay: 0.3 });
  const pt = $('.preloader_text');
  if (pt) intro.add(blurIn(pt, { dur: 0.7, stagger: 0.035 }), 0.4);
  if (topTexts[1]) intro.add(blurIn(topTexts[1], { dur: 0.5, stagger: 0.025 }), 1.2);
  intro.to(scrollEl, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 2.2);
  intro.to(scrollText1, { opacity: 1, duration: 0.4 }, 2.2);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
