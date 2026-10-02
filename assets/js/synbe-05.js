
(function () {
  function core() {
    return window.__synbeCore || null;
  }

  function scroller() {
    var c = core();
    return c && c.raf && typeof c.raf.setScroll === 'function' ? c.raf : null;
  }

  function currentScroll() {
    var c = core();
    if (c && c.raf && c.raf.scroll) {
      return c.raf.scroll.current || c.raf.scroll.rounded || c.raf.scroll.target || 0;
    }
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function sectionTop(selector) {
    var el = document.querySelector(selector);
    if (!el) return null;

    var c = core();
    if (c && c.smooth && c.smooth.sections && c.smooth.sections.length) {
      for (var i = 0; i < c.smooth.sections.length; i++) {
        var section = c.smooth.sections[i];
        if (section.el === el || section.el.contains(el)) {
          return Math.max(0, section.top || 0);
        }
      }
    }

    var rect = el.getBoundingClientRect();
    return Math.max(0, rect.top + currentScroll());
  }

  function signupContactTop() {
    var signup = document.querySelector('#signup');
    if (!signup) return null;

    var top = sectionTop('#signup');
    if (top === null) return null;

    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    var h = signup.offsetHeight || vh * 3;

    // Signup has an initial black reveal. This lands on the visible title/form state.
    return Math.max(0, top + Math.min(h * 0.72, Math.max(vh * 1.95, h - vh * 0.55)));
  }

  function openSignupOnly() {
    var mask = document.querySelector('#signup .signup-mask');
    var content = document.querySelector('#signup .sticky-content');

    if (mask) {
      mask.style.clipPath = 'circle(130% at center)';
      mask.style.webkitClipPath = 'circle(130% at center)';
    }

    if (content) {
      content.style.opacity = '1';
      content.style.visibility = 'visible';
    }
  }

  function destination(hash) {
    if (hash === '#signup' || hash === '#signup-contact') return signupContactTop();
    return sectionTop(hash);
  }

  function go(hash) {
    var y = destination(hash);
    if (y === null || typeof y === 'undefined') return;

    var s = scroller();
    if (s) {
      s.setScroll(y);
    } else {
      window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
    }

    if (hash === '#signup' || hash === '#signup-contact') {
      window.setTimeout(openSignupOnly, 120);
      window.setTimeout(openSignupOnly, 550);
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;

    var hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    if (hash !== '#signup-contact' && hash !== '#signup' && !document.querySelector(hash)) return;

    event.preventDefault();
    event.stopPropagation();
    go(hash);

    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', hash);
    }
  }, true);
})();
