
  (function () {
    function initTunnel(section) {
      var canvas = section.querySelector('.granovetter-tunnel-gl');
      var container = section.querySelector('.granovetter-tunnel-container');
      var bgInner = section.querySelector('.granovetter-tunnel-bg-inner');
      if (!canvas || !container || !bgInner) return;

      var ctx = canvas.getContext('2d');
      var W = 0;
      var H = 0;
      var cx = 0;
      var cy = 0;
      var lines = [];
      var NUM_RECTS = 6;
      var raf = null;

      function setup() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var rect = container.getBoundingClientRect();
        W = Math.max(1, rect.width);
        H = Math.max(1, rect.height);
        cx = (W - 1) / 2;
        cy = (H - 1) / 2;

        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var bw = W * 0.5;
        var bh = H * 0.5;
        bgInner.style.width = bw + 'px';
        bgInner.style.height = bh + 'px';
        bgInner.style.transform = 'scale(1.5)';

        lines = [];
        for (var v = 0; v < NUM_RECTS; v++) {
          lines[v] = { t: v * 0.025 };
        }
      }

      function draw() {
        var n = W - 1;
        var l = H - 1;
        var NUM_SPOKES = 46;
        var angleStep = (2 * Math.PI) / NUM_SPOKES;
        var spokeRadius = Math.sqrt(n * n + l * l) / 2;

        ctx.clearRect(0, 0, W, H);
        ctx.strokeStyle = '#878787';
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.rect(0, 0, n, l);
        ctx.stroke();

        for (var i = 0; i < NUM_SPOKES; i++) {
          var angle = i * angleStep;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + spokeRadius * Math.cos(angle), cy + spokeRadius * Math.sin(angle));
          ctx.stroke();
        }

        for (var v = 0; v < NUM_RECTS; v++) {
          if (lines[v].t > 0.7) {
            lines[v].t = 0.55;
          } else {
            lines[v].t += 0.002;
          }

          var rw = (n - n * lines[v].t) + v * (n * 0.15);
          var rh = (l - l * lines[v].t) + v * (l * 0.15);

          ctx.save();
          ctx.translate(cx, cy);
          ctx.strokeRect(-rw / 2, -rh / 2, rw, rh);
          ctx.restore();
        }

        raf = window.requestAnimationFrame(draw);
      }

      setup();
      draw();

      if ('ResizeObserver' in window) {
        var observer = new ResizeObserver(setup);
        observer.observe(container);
      } else {
        window.addEventListener('resize', setup);
      }

      window.addEventListener('beforeunload', function () {
        if (raf) window.cancelAnimationFrame(raf);
      });
    }

    function init() {
      var sections = document.querySelectorAll('.granovetter-closing-section');
      for (var i = 0; i < sections.length; i++) initTunnel(sections[i]);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
