/* Progresso de leitura, voltar ao topo, contagem dos números do Caso e
   sugestão do outro idioma. No desktop a rolagem é virtual
   (window.__granovetterCore.raf.scroll); no mobile é a rolagem nativa. */
(function () {
  var root = document.documentElement;
  var t = function (k, fb) { return root.getAttribute('data-t-' + k) || fb; };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function core() { return window.__granovetterCore && window.__granovetterCore.raf && window.__granovetterCore.raf.scroll; }
  function position() {
    var c = core();
    if (c) {
      var content = document.querySelector('.page-content');
      var max = content ? content.getBoundingClientRect().height - innerHeight : 1;
      return { y: c.current, max: Math.max(1, max) };
    }
    return { y: window.scrollY, max: Math.max(1, document.documentElement.scrollHeight - innerHeight) };
  }
  function toTop() {
    var c = core();
    if (c) { c.target = 0; return; }
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  // barra de progresso
  var bar = document.createElement('div');
  bar.className = 'gv-progress';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', t('progress', 'Progresso de leitura'));
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  bar.innerHTML = '<span></span>';
  document.body.appendChild(bar);

  // voltar ao topo
  var up = document.createElement('button');
  up.type = 'button';
  up.className = 'gv-top';
  up.setAttribute('aria-label', t('top', 'Voltar ao topo'));
  up.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 5l-7 7m7-7l7 7M12 5v14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  up.addEventListener('click', function () { toTop(); var s = document.querySelector('.granovetter-skip, a.mark'); if (s) s.focus({ preventScroll: true }); });
  document.body.appendChild(up);

  // contagem dos números (62,5% / 62.5% / 85%)
  var nums = [].slice.call(document.querySelectorAll('.granovetter-case-n, .cn'));
  nums.forEach(function (el) { el.setAttribute('data-final', el.textContent); });
  function animate(el) {
    var final = el.getAttribute('data-final');
    var m = final.match(/^([\d.,]+)(.*)$/);
    if (!m || reduce) { el.textContent = final; return; }
    var sep = m[1].indexOf(',') >= 0 ? ',' : '.';
    var target = parseFloat(m[1].replace(',', '.'));
    var dec = (m[1].split(/[.,]/)[1] || '').length;
    var t0 = performance.now(), dur = 1100;
    (function step(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = (target * e).toFixed(dec).replace('.', sep) + m[2];
      if (k < 1) requestAnimationFrame(step); else el.textContent = final;
    })(t0);
  }

  function tick() {
    var p = position(), pct = Math.min(100, Math.max(0, (p.y / p.max) * 100));
    bar.firstChild.style.transform = 'scaleX(' + pct / 100 + ')';
    bar.setAttribute('aria-valuenow', String(Math.round(pct)));
    up.classList.toggle('on', p.y > innerHeight * 1.2);
    nums.forEach(function (el) {
      if (el.getAttribute('data-done')) return;
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && r.bottom > 0) { el.setAttribute('data-done', '1'); animate(el); }
    });
  }
  setInterval(tick, 120);
  window.addEventListener('scroll', tick, { passive: true });

  // sugere o outro idioma quando o navegador não está no idioma da página
  try {
    var pageLang = (root.lang || 'pt').slice(0, 2);
    var langs = (navigator.languages || [navigator.language || '']).map(function (l) { return (l || '').slice(0, 2); });
    var other = document.getElementById('granovetter-lang');
    var dismissed = false;
    try { dismissed = localStorage.getItem('gv-lang-dismissed') === '1'; } catch (e) {}
    var wantsOther = pageLang === 'pt' ? langs.indexOf('pt') < 0 : langs[0] === 'pt';
    if (other && wantsOther && !dismissed) {
      var toast = document.createElement('div');
      toast.className = 'gv-lang';
      toast.setAttribute('role', 'region');
      toast.setAttribute('aria-label', t('toast', ''));
      toast.innerHTML = '<p></p><a></a><button type="button"></button>';
      toast.querySelector('p').textContent = t('toast', '');
      var go = toast.querySelector('a'); go.textContent = t('go', 'English'); go.href = other.getAttribute('href'); go.setAttribute('data-taxi-ignore', '');
      var x = toast.querySelector('button'); x.textContent = t('close', 'Fechar');
      x.addEventListener('click', function () { toast.remove(); document.body.classList.remove('gv-has-toast'); try { localStorage.setItem('gv-lang-dismissed', '1'); } catch (e) {} });
      setTimeout(function () { document.body.appendChild(toast); document.body.classList.add('gv-has-toast'); }, 3500);
    }
  } catch (e) {}
})();
