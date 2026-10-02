
(function () {
  if (window.__synbeIntroLoaded) return;
  window.__synbeIntroLoaded = true;

  window.scrollTo(0, 0);
  document.body.style.overflow = 'hidden';
  document.body.style.cursor = 'none';

  const CHARS  = '$#*/\\|=-~·. ';
  const N_CH   = CHARS.length - 1;
  const CH_W   = 6, CH_H = 11;
  const THRESH = 220;

  const vid = document.getElementById('synintro-vid');
  const ac = document.getElementById('synintro-asc');
  const actx = ac.getContext('2d');
  const gc = document.createElement('canvas');
  const gctx = gc.getContext('2d');
  let W, H, cols, rows;

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    ac.width = W; ac.height = H;
    cols = Math.floor(W / CH_W);
    rows = Math.floor(H / CH_H);
    gc.width = cols; gc.height = rows;
    logoGrid = null;
  }

  vid.play().catch(() => {
    const r = () => vid.play().catch(() => {});
    document.addEventListener('click', r, { once:true });
    document.addEventListener('touchstart', r, { once:true });
  });
  vid.addEventListener('loadedmetadata', () => { vid.currentTime = 1.8; }, { once:true });
  vid.addEventListener('canplay', () => { if (vid.currentTime < 0.1) vid.currentTime = 1.8; }, { once:true });

  function drawVideoFrame() {
    if (vid.readyState < 2 || !vid.videoWidth) return false;
    const vw = vid.videoWidth, vh = vid.videoHeight;
    const vAR = vw / vh, cAR = (cols * CH_W) / (rows * CH_H);
    let sx, sy, sw, sh;
    if (vAR > cAR) { sh = vh; sw = sh * cAR; sx = (vw - sw) / 2; sy = 0; }
    else           { sw = vw; sh = sw / cAR; sx = 0; sy = (vh - sh) / 2; }
    gctx.drawImage(vid, sx, sy, sw, sh, 0, 0, cols, rows);
    return true;
  }

  function renderAscii(alpha, revealRows) {
    if (alpha < 0.005) { actx.clearRect(0, 0, W, H); return; }
    if (!drawVideoFrame()) return;
    let px;
    try { px = gctx.getImageData(0, 0, cols, rows).data; } catch(e) { return; }
    const maxRow = (revealRows === undefined) ? rows : Math.min(revealRows, rows);
    actx.clearRect(0, 0, W, H);
    actx.font = `${CH_H}px 'Courier New', monospace`;
    actx.textBaseline = 'top';
    actx.fillStyle = 'rgb(235,228,215)';
    for (let r = 0; r < maxRow; r++) {
      const rp = revealRows !== undefined ? Math.min(1, (revealRows - r) / (rows * 0.12 + 1)) : 1;
      for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 4;
        const lum = 0.21 * px[i] + 0.72 * px[i+1] + 0.07 * px[i+2];
        if (lum < 8 || lum > THRESH) continue;
        const base = Math.floor((lum / THRESH) * N_CH);
        const ci = Math.max(0, Math.min(N_CH, base + (((Math.random() - 0.5) * 4) | 0)));
        actx.globalAlpha = Math.min((1 - lum / THRESH) * alpha * 1.6, 0.95) * rp;
        actx.fillText(CHARS[ci], c * CH_W, r * CH_H);
      }
    }
    actx.globalAlpha = 1;
  }

  const logoImg = new Image();
  logoImg.crossOrigin = "anonymous";
  logoImg.src = "https://cdn.prod.website-files.com/69d94fc81078b0ea07475606/6a21711382055d747ac97107_logo.png";
  let logoGrid = null, logoCols = 0, logoRows = 0, logoOffX = 0, logoOffY = 0, logoPx = null;

  function buildLogoGrid() {
    if (!logoImg.complete || !logoImg.naturalWidth) return false;
    const targetW = W * 0.88;
    logoCols = Math.floor(targetW / CH_W);
    logoRows = Math.max(1, Math.floor((logoImg.naturalHeight * (targetW / logoImg.naturalWidth)) / CH_H));
    logoGrid = document.createElement('canvas');
    logoGrid.width = logoCols; logoGrid.height = logoRows;
    logoGrid.getContext('2d').drawImage(logoImg, 0, 0, logoCols, logoRows);
    logoOffX = Math.floor((W - logoCols * CH_W) / 2);
    logoOffY = Math.floor((H - logoRows * CH_H) / 2);
    try { logoPx = logoGrid.getContext('2d').getImageData(0, 0, logoCols, logoRows).data; }
    catch(e) { logoPx = null; }
    return true;
  }

  let springs = [];

  function spawnSpringParticles() {
    if (!drawVideoFrame()) return;
    if (!logoGrid && !buildLogoGrid()) return;
    let px;
    try { px = gctx.getImageData(0, 0, cols, rows).data; } catch(e) { return; }
    const targets = [];
    for (let r = 0; r < logoRows; r++) {
      for (let c = 0; c < logoCols; c++) {
        const i = (r * logoCols + c) * 4;
        if (logoPx[i + 3] < 15) continue;
        targets.push({
          tx: logoOffX + c * CH_W, ty: logoOffY + r * CH_H,
          char: CHARS[Math.max(0, Math.min(N_CH, Math.floor(Math.random() * N_CH * 0.35)))]
        });
      }
    }
    if (!targets.length) return;
    springs = [];
    const srcs = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 4;
        const lum = 0.21 * px[i] + 0.72 * px[i+1] + 0.07 * px[i+2];
        if (lum < 8 || lum > THRESH) continue;
        if (Math.random() > 0.35) continue;
        srcs.push({ x: c * CH_W, y: r * CH_H });
      }
    }
    if (!srcs.length) return;
    for (let t = 0; t < targets.length; t++) {
      const src = srcs[Math.floor(Math.random() * srcs.length)];
      const tgt = targets[t];
      const k  = 180 + Math.random() * 120;
      const damp = 0.82 + Math.random() * 0.12;
      springs.push({
        x: src.x, y: src.y,
        vx: (Math.random() - 0.5) * 60, vy: (Math.random() - 0.5) * 60,
        tx: tgt.tx, ty: tgt.ty,
        char: tgt.char, k, damp,
        alpha: 0.85 + Math.random() * 0.1, settled: false,
      });
    }
  }

  function updateSprings(dt) {
    const s = dt / 1000;
    let allSettled = true;
    for (const p of springs) {
      if (p.settled) continue;
      const dx = p.tx - p.x, dy = p.ty - p.y;
      const ax = dx * p.k, ay = dy * p.k;
      p.vx = (p.vx + ax * s) * p.damp;
      p.vy = (p.vy + ay * s) * p.damp;
      p.x += p.vx * s; p.y += p.vy * s;
      if (Math.abs(dx) < 1.5 && Math.abs(dy) < 1.5 && Math.abs(p.vx) < 8 && Math.abs(p.vy) < 8) {
        p.x = p.tx; p.y = p.ty; p.settled = true;
      } else { allSettled = false; }
    }
    return allSettled;
  }

  function drawSprings() {
    actx.font = `${CH_H}px 'Courier New', monospace`;
    actx.textBaseline = 'top';
    actx.fillStyle = 'rgb(235,228,215)';
    for (const p of springs) {
      actx.globalAlpha = p.alpha;
      actx.fillText(p.char, p.x, p.y);
    }
    actx.globalAlpha = 1;
  }

  let blastParts = [];
  let blastElapsed = 0;

  function spawnBlast() {
    blastParts = [];
    for (const p of springs) {
      const cx = W / 2, cy = H / 2;
      const dx = p.tx - cx, dy = p.ty - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed = 3.5 + Math.random() * 5.0;
      blastParts.push({
        x: p.tx, y: p.ty,
        vx: (dx / dist) * speed + (Math.random() - 0.5) * 2.5,
        vy: (dy / dist) * speed * 0.7 + (Math.random() - 0.5) * 2.0,
        gravity: 0.18 + Math.random() * 0.32,
        char: p.char,
        alpha: 0.9 + Math.random() * 0.1,
      });
    }
    startReveal();
  }

  function drawBlast(dt) {
    const f = dt / 16;
    actx.font = `${CH_H}px 'Courier New',monospace`;
    actx.textBaseline = 'top';
    actx.fillStyle = 'rgb(235,228,215)';
    for (const p of blastParts) {
      if (p.alpha < 0.01) continue;
      p.vy += p.gravity * f;
      p.x  += p.vx * f;
      p.y  += p.vy * f;
      p.alpha = Math.max(0, p.alpha - dt * 0.00068);
      actx.globalAlpha = p.alpha;
      actx.fillText(p.char, p.x, p.y);
    }
    actx.globalAlpha = 1;
  }

  let phase = 'idle';
  let springElapsed = 0;
  let fillElapsed = 0;
  let blastDone = false;
  let fillScheduled = false;
  let revealDone = false;

  function doExplode() {
    if (phase !== 'idle') return;
    phase = 'spring';
    springElapsed = 0;
    document.getElementById('synintro-hint')?.classList.remove('show');
    spawnSpringParticles();
  }

  function startReveal() {
    if (revealDone) return;
    revealDone = true;
    document.body.classList.add('synbe-intro-revealing');
    ac.style.transition = 'opacity 2.0s ease';
    ac.style.opacity = '0';
    const introBg = document.getElementById('synintro-bg');
    introBg.style.transition = 'opacity 1.6s ease';
    introBg.style.opacity = '0';
    document.getElementById('synintro-ui').style.opacity = '0';
    document.getElementById('synintro-hint').style.opacity = '0';
    setTimeout(() => {
      phase = 'reveal';
      document.body.style.overflow = '';
      document.body.style.cursor = 'auto';
      document.body.classList.add('synbe-intro-done');
      ac.remove();
      document.getElementById('synintro-bg')?.remove();
      document.getElementById('synintro-ui')?.remove();
      document.getElementById('synintro-hint')?.remove();
      document.getElementById('synintro-vid')?.remove();
    }, 2800);
  }

  const RAIN_DUR   = 2200;
  const SPRING_MAX = 1100;
  let prevT = 0, vidAlpha = 0, elapsed = 0;

  function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min(now - prevT, 50); prevT = now;
    elapsed += dt;

    if (phase === 'idle') {
      vidAlpha = Math.min(vidAlpha + dt / 1600, 1.0);
      const rr = elapsed < RAIN_DUR ? Math.floor((elapsed / RAIN_DUR) * rows * 1.08) : undefined;
      renderAscii(vidAlpha, rr);
      if (elapsed > 4000) {
        const cnt = document.getElementById('synintro-cnt');
        if (cnt) cnt.textContent = String(Math.min(((elapsed - 4000) / 80) | 0, 100)).padStart(3, '0');
      }
      return;
    }

    if (phase === 'spring') {
      springElapsed += dt;
      actx.clearRect(0, 0, W, H);
      const done = updateSprings(dt);
      drawSprings();
      if ((done || springElapsed >= SPRING_MAX) && !fillScheduled) {
        fillScheduled = true;
        for (const p of springs) { p.x = p.tx; p.y = p.ty; p.settled = true; }
        setTimeout(() => {
          phase = 'fill'; fillElapsed = 0;
          const bg = document.getElementById('synintro-bg');
          if (bg) {
            bg.style.transition = 'background-color 1.4s ease';
            bg.style.backgroundColor = '#000';
          }
        }, 350);
      }
      return;
    }

    if (phase === 'fill') {
      fillElapsed += dt;
      actx.clearRect(0, 0, W, H);
      drawSprings();
      if (fillElapsed >= 420 && !blastDone) {
        blastDone = true;
        spawnBlast();
        phase = 'blast';
        blastElapsed = 0;
      }
      return;
    }

    if (phase === 'blast') {
      blastElapsed += dt;
      actx.clearRect(0, 0, W, H);
      drawBlast(dt);
      return;
    }
  }

  resize();
  window.addEventListener('resize', resize);

  let clickReady = false;
  setTimeout(() => { clickReady = true; }, 1200);
  window.addEventListener('click', () => { if (clickReady) doExplode(); });
  window.addEventListener('touchstart', () => { if (clickReady) doExplode(); });
  document.getElementById('synintro-btn')?.addEventListener('click', doExplode);

  setTimeout(() => document.getElementById('synintro-logo')?.classList.add('show'), 2500);
  setTimeout(() => {
    document.getElementById('synintro-btn')?.classList.add('show');
    document.getElementById('synintro-cnt')?.classList.add('show');
    document.getElementById('synintro-hint')?.classList.add('show');
  }, 4000);

  setTimeout(() => { if (phase === 'idle') doExplode(); }, 14000);
  requestAnimationFrame(loop);
})();
