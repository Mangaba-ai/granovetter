
/* ── WAVE FIELD + SPRING PHYSICS ── */
(function() {
  const canvas = document.getElementById('ir-wave-cvs');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, t0 = null;
  const mouse = { x: -9999, y: -9999, on: false };

  const GAP  = 13;      // grid spacing px
  const MR   = 165;     // mouse repel radius px
  const MR2  = MR * MR;
  const NB   = 7;       // opacity render buckets
  const bufs = Array.from({ length: NB }, () => []);

  // Flat particle array: [ox, oy, cx, cy, vx, vy, ...]
  // ox/oy = rest position, cx/cy = current position, vx/vy = velocity
  const STRIDE = 6;
  let pts = [];

  function build() {
    const p = canvas.parentElement.getBoundingClientRect();
    W = p.width  || canvas.offsetWidth  || window.innerWidth;
    H = p.height || canvas.offsetHeight || window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    pts = [];
    for (let y = GAP * 0.5; y < H + GAP; y += GAP)
      for (let x = GAP * 0.5; x < W + GAP; x += GAP)
        pts.push(x, y, x, y, 0, 0);  // ox, oy, cx, cy, vx, vy
    t0 = null;
  }

  /* Wave brightness field — creates the flowing bands */
  function wave(nx, ny, t) {
    const v =
      Math.sin(nx * 15.71 + ny * 5.03 + t * 0.40) * 0.50 +
      Math.sin(nx * 10.99 - ny * 7.85 + t * 0.26 + 1.57) * 0.32 +
      Math.cos(nx *  6.28 + ny * 11.00 - t * 0.32 + 0.79) * 0.18;
    return Math.max(0, Math.min(1, (v + 1) * 0.5));
  }

  /* Vertical envelope — softer falloff so edges stay subtly visible */
  function bandEnv(ny) {
    const v = 1 - ((ny - 0.50) / 0.34) * ((ny - 0.50) / 0.34);
    return Math.max(0, v);
  }

  /* Stroke angle from wave field */
  function strokeAngle(nx, ny, t) {
    return (
      Math.sin(nx * 13.8 + ny *  5.7 + t * 0.21) * 0.72 +
      Math.cos(nx *  8.2 - ny *  8.8 - t * 0.17 + 1.0)  * 0.46
    );
  }

  /* Flow field — orientacao dos tracos por campo vetorial que flui no tempo */
  function field(nx, ny, t) {
    return Math.sin(nx * 6.2 + ny * 1.6 + t * 0.55) * 1.15
         + Math.cos(ny * 5.0 - nx * 2.1 - t * 0.40 + 1.0) * 0.95
         + Math.sin((nx + ny) * 4.2 + t * 0.30) * 0.70;
  }

  function frame(ts) {
    if (!t0) t0 = ts;
    const t = (ts - t0) * 0.001;

    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';

    for (let b = 0; b < NB; b++) bufs[b].length = 0;

    for (let i = 0; i < pts.length; i += STRIDE) {
      const ox = pts[i],     oy = pts[i + 1];
      let   cx = pts[i + 2], cy = pts[i + 3];
      let   vx = pts[i + 4], vy = pts[i + 5];

      /* --- Spring physics (creates the bounce) --- */
      // Pull back toward rest position
      vx += (ox - cx) * 0.022;
      vy += (oy - cy) * 0.022;

      // Mouse repulsion — same model as syntropic.html
      let hlt = 0;
      if (mouse.on) {
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MR2) {
          const d  = Math.sqrt(d2) || 1;
          const tt = (MR - d) / MR;
          const s  = tt * tt;
          vx += (dx / d) * s * 2.6;
          vy += (dy / d) * s * 2.6;
          hlt = tt;
        }
      }

      // Damping — slightly underdamped so the bounce oscillates once
      vx *= 0.930;
      vy *= 0.930;

      cx += vx;
      cy += vy;

      pts[i + 2] = cx;  pts[i + 3] = cy;
      pts[i + 4] = vx;  pts[i + 5] = vy;

      /* --- Flow field: orientacao por campo vetorial (na posicao de repouso) --- */
      const nx = ox / W, ny = oy / H;
      const ang = field(nx, ny, t);

      // brilho varia com a orientacao; o cursor clareia os tracos perto do mouse
      const brt = Math.min(0.999, 0.40 + 0.55 * Math.abs(Math.sin(ang * 0.9 + t * 0.18)) + hlt * 0.45);

      // comprimento do traco; o cursor alonga perto do mouse (repulsao continua na fisica de mola)
      const hl  = GAP * 0.64 * (1 + hlt * 0.6);
      const cs  = Math.cos(ang) * hl;
      const sn  = Math.sin(ang) * hl;

      const bi = Math.min(NB - 1, Math.floor(Math.min(brt, 0.999) * NB));
      bufs[bi].push(cx - cs, cy - sn, cx + cs, cy + sn);
    }

    /* Render buckets — minimum alpha raised to 0.15 */
    for (let b = 0; b < NB; b++) {
      const data = bufs[b];
      if (!data.length) continue;
      ctx.globalAlpha = 0.28 + (b / (NB - 1)) * 0.62;
      ctx.lineWidth   = 0.85 + (b / (NB - 1)) * 0.55;
      ctx.strokeStyle = '#ededee';
      ctx.beginPath();
      for (let j = 0; j < data.length; j += 4) {
        ctx.moveTo(data[j],     data[j + 1]);
        ctx.lineTo(data[j + 2], data[j + 3]);
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  // Mouse tracking — hero bounds only
  const heroEl = canvas.closest('.hero');
  window.addEventListener('mousemove', e => {
    if (!heroEl) return;
    const r = canvas.getBoundingClientRect();
    if (e.clientY >= r.top && e.clientY <= r.bottom) {
      mouse.x  = e.clientX - r.left;
      mouse.y  = e.clientY - r.top;
      mouse.on = true;
    } else {
      mouse.on = false;
    }
  }, { passive: true });

  let rz;
  window.addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(build, 100);
  }, { passive: true });

  window.addEventListener('load', () => { build(); requestAnimationFrame(frame); });
  setTimeout(() => { build(); requestAnimationFrame(frame); }, 200);
})();
