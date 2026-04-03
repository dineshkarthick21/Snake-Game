// ─── Setup ───────────────────────────────────────────────────────────────────

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ─── Cursor ───────────────────────────────────────────────────────────────────

const cursorEl = document.createElement('div');
cursorEl.id = 'cursor';
document.body.appendChild(cursorEl);

const scanlines = document.createElement('div');
scanlines.className = 'scanlines';
document.body.appendChild(scanlines);

// ─── State ────────────────────────────────────────────────────────────────────

const PALETTES = [
  { head: '#00ff88', body: ['#00ff88', '#00cc6a', '#009944'], glow: 'rgba(0,255,136,0.5)' },
  { head: '#ff006e', body: ['#ff006e', '#cc0055', '#990040'], glow: 'rgba(255,0,110,0.5)' },
  { head: '#00d4ff', body: ['#00d4ff', '#00aacc', '#007799'], glow: 'rgba(0,212,255,0.5)' },
  { head: '#ffcc00', body: ['#ffcc00', '#cc9900', '#996600'], glow: 'rgba(255,204,0,0.5)' },
  { head: '#bf00ff', body: ['#bf00ff', '#9900cc', '#660099'], glow: 'rgba(191,0,255,0.5)' },
  { head: '#ff4400', body: ['#ff4400', '#cc3300', '#992200'], glow: 'rgba(255,68,0,0.5)' },
];

let paletteIndex = 0;
let palette = PALETTES[paletteIndex];
let trailMode = false;

const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let lastMouse = { x: mouse.x, y: mouse.y };
let speed = 0;

// Snake segments
const MAX_SEGMENTS = 60;
const SEGMENT_RADIUS = 14;
const MIN_DIST = 10;

let segments = [];
let foodParticles = [];
let bgParticles = [];

function initSnake() {
  segments = [];
  for (let i = 0; i < 20; i++) {
    segments.push({
      x: canvas.width / 2 - i * MIN_DIST,
      y: canvas.height / 2,
    });
  }
}

// ─── Food / Orbs ──────────────────────────────────────────────────────────────

function spawnFood() {
  const margin = 80;
  foodParticles.push({
    x: margin + Math.random() * (canvas.width - margin * 2),
    y: margin + Math.random() * (canvas.height - margin * 2),
    r: 6 + Math.random() * 6,
    pulse: Math.random() * Math.PI * 2,
    color: PALETTES[Math.floor(Math.random() * PALETTES.length)].head,
    eaten: false,
    alpha: 1,
  });
}

for (let i = 0; i < 8; i++) spawnFood();

// Background floating particles
for (let i = 0; i < 40; i++) {
  bgParticles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 0.5 + Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    alpha: 0.1 + Math.random() * 0.3,
  });
}

// ─── Burst Particles ──────────────────────────────────────────────────────────

let burstParticles = [];

function burst(x, y, color) {
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI * 2 / 16) * i + Math.random() * 0.4;
    const spd = 2 + Math.random() * 4;
    burstParticles.push({
      x, y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd,
      r: 2 + Math.random() * 3,
      alpha: 1,
      color,
    });
  }
}

// ─── Mouse tracking ───────────────────────────────────────────────────────────

document.addEventListener('mousemove', (e) => {
  lastMouse.x = mouse.x;
  lastMouse.y = mouse.y;
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  cursorEl.style.left = mouse.x + 'px';
  cursorEl.style.top = mouse.y + 'px';

  const dx = mouse.x - lastMouse.x;
  const dy = mouse.y - lastMouse.y;
  speed = Math.min(Math.sqrt(dx * dx + dy * dy), 40);
});

// Touch support
document.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const t = e.touches[0];
  mouse.x = t.clientX;
  mouse.y = t.clientY;
  cursorEl.style.left = mouse.x + 'px';
  cursorEl.style.top = mouse.y + 'px';
}, { passive: false });

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dist(a, b) {
  const dx = a.x - b.x, dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function lerp(a, b, t) { return a + (b - a) * t; }

// ─── Update ───────────────────────────────────────────────────────────────────

let time = 0;
const lengthEl = document.getElementById('length-val');
const speedEl = document.getElementById('speed-val');

function update() {
  time++;

  // Move head toward mouse
  const head = segments[0];
  const dx = mouse.x - head.x;
  const dy = mouse.y - head.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  if (d > 2) {
    const factor = Math.min(d, 12) / d;
    segments[0] = {
      x: head.x + dx * factor * 0.35,
      y: head.y + dy * factor * 0.35,
    };
  }

  // Chain body segments
  for (let i = 1; i < segments.length; i++) {
    const prev = segments[i - 1];
    const curr = segments[i];
    const dd = dist(prev, curr);
    if (dd > MIN_DIST) {
      const ratio = (dd - MIN_DIST) / dd;
      segments[i] = {
        x: curr.x + (prev.x - curr.x) * ratio * 0.6,
        y: curr.y + (prev.y - curr.y) * ratio * 0.6,
      };
    }
  }

  // Grow snake over time (cap at MAX_SEGMENTS)
  if (segments.length < MAX_SEGMENTS && time % 15 === 0) {
    const last = segments[segments.length - 1];
    segments.push({ x: last.x, y: last.y });
  }

  // Check food collision
  for (let f of foodParticles) {
    if (!f.eaten && dist(segments[0], f) < SEGMENT_RADIUS + f.r + 4) {
      f.eaten = true;
      burst(f.x, f.y, f.color);
      // Grow
      for (let g = 0; g < 5; g++) {
        const last = segments[segments.length - 1];
        if (segments.length < MAX_SEGMENTS) {
          segments.push({ x: last.x, y: last.y });
        }
      }
      setTimeout(() => {
        foodParticles = foodParticles.filter(fp => fp !== f);
        spawnFood();
      }, 400);
    }
  }

  // Update burst particles
  burstParticles = burstParticles.filter(p => p.alpha > 0.01);
  for (let p of burstParticles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.92;
    p.vy *= 0.92;
    p.r *= 0.96;
    p.alpha *= 0.94;
  }

  // Pulse food
  for (let f of foodParticles) {
    f.pulse += 0.05;
  }

  // Background particles drift
  for (let p of bgParticles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  }

  // Stats
  speed *= 0.9;
  lengthEl.textContent = segments.length;
  speedEl.textContent = Math.round(speed * 3);
}

// ─── Draw ─────────────────────────────────────────────────────────────────────

function draw() {
  if (trailMode) {
    ctx.fillStyle = 'rgba(5,5,8,0.18)';
  } else {
    ctx.fillStyle = '#050508';
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Background particles
  for (let p of bgParticles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,136,${p.alpha})`;
    ctx.fill();
  }

  // Food orbs
  for (let f of foodParticles) {
    if (f.eaten) continue;
    const pulsed = f.r + Math.sin(f.pulse) * 2;

    // Outer glow
    const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, pulsed * 3);
    grad.addColorStop(0, f.color + 'cc');
    grad.addColorStop(1, f.color + '00');
    ctx.beginPath();
    ctx.arc(f.x, f.y, pulsed * 3, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(f.x, f.y, pulsed, 0, Math.PI * 2);
    ctx.fillStyle = f.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = f.color;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Inner shine
    ctx.beginPath();
    ctx.arc(f.x - pulsed * 0.3, f.y - pulsed * 0.3, pulsed * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
  }

  // Draw snake body
  const n = segments.length;

  for (let i = n - 1; i >= 0; i--) {
    const seg = segments[i];
    const t = i / n; // 0 = head, 1 = tail
    const radius = SEGMENT_RADIUS * (1 - t * 0.55);
    const colorIdx = Math.min(Math.floor(t * palette.body.length), palette.body.length - 1);
    const alpha = 1 - t * 0.3;

    // Glow for head region
    if (i < 8) {
      ctx.shadowBlur = 20 * (1 - i / 8);
      ctx.shadowColor = palette.glow;
    } else {
      ctx.shadowBlur = 4;
      ctx.shadowColor = palette.glow;
    }

    // Segment circle
    ctx.beginPath();
    ctx.arc(seg.x, seg.y, radius, 0, Math.PI * 2);

    if (i === 0) {
      // Head gradient
      const g = ctx.createRadialGradient(seg.x - 3, seg.y - 3, 1, seg.x, seg.y, radius);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.3, palette.head);
      g.addColorStop(1, palette.body[1]);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = palette.body[colorIdx] + Math.round(alpha * 255).toString(16).padStart(2, '0');
    }
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // Eyes on head
  const head = segments[0];
  const next = segments[1] || { x: head.x - 1, y: head.y };
  const angle = Math.atan2(head.y - next.y, head.x - next.x);
  const eyeOffset = SEGMENT_RADIUS * 0.45;
  const eyeR = SEGMENT_RADIUS * 0.22;

  for (let side of [-1, 1]) {
    const ex = head.x + Math.cos(angle + side * Math.PI / 2.2) * eyeOffset;
    const ey = head.y + Math.sin(angle + side * Math.PI / 2.2) * eyeOffset;

    // Pupil
    ctx.beginPath();
    ctx.arc(ex, ey, eyeR, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0a0a';
    ctx.fill();

    // Shine
    ctx.beginPath();
    ctx.arc(ex - eyeR * 0.3, ey - eyeR * 0.3, eyeR * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fill();
  }

  // Tongue flick
  if (Math.floor(time / 10) % 4 < 2) {
    const tLen = 14;
    const tx = head.x + Math.cos(angle) * (SEGMENT_RADIUS + 2);
    const ty = head.y + Math.sin(angle) * (SEGMENT_RADIUS + 2);
    ctx.strokeStyle = palette.head;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 6;
    ctx.shadowColor = palette.head;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(tx + Math.cos(angle) * tLen, ty + Math.sin(angle) * tLen);
    ctx.stroke();
    // Fork
    const fx = tx + Math.cos(angle) * tLen;
    const fy = ty + Math.sin(angle) * tLen;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx + Math.cos(angle + 0.4) * 7, fy + Math.sin(angle + 0.4) * 7);
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx + Math.cos(angle - 0.4) * 7, fy + Math.sin(angle - 0.4) * 7);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Burst particles
  for (let p of burstParticles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
    ctx.fill();
  }
}

// ─── Loop ─────────────────────────────────────────────────────────────────────

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

initSnake();
loop();

// ─── Controls ─────────────────────────────────────────────────────────────────

document.getElementById('colorBtn').addEventListener('click', () => {
  paletteIndex = (paletteIndex + 1) % PALETTES.length;
  palette = PALETTES[paletteIndex];
});

document.getElementById('trailBtn').addEventListener('click', () => {
  trailMode = !trailMode;
  document.getElementById('trailBtn').textContent = trailMode ? '✨ TRAIL ON' : '✨ TRAIL';
});

document.getElementById('resetBtn').addEventListener('click', () => {
  initSnake();
  burstParticles = [];
  foodParticles = [];
  for (let i = 0; i < 8; i++) spawnFood();
});
