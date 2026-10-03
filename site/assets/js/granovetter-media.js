/* Vídeos em loop que substituem os antigos GIFs. O Chrome pausa vídeos mudos
   fora da tela e, com a rolagem virtual do site (transform), nem sempre os
   retoma; aqui eles tocam quando aparecem na tela e pausam quando saem. */
(function () {
  function videos() { return document.querySelectorAll("video.granovetter-process-gif, video.gif"); }
  function visible(v) {
    var r = v.getBoundingClientRect();
    return r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  }
  function tick() {
    videos().forEach(function (v) {
      v.muted = true;
      if (visible(v)) { if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
      else if (!v.paused) v.pause();
    });
  }
  setInterval(tick, 400);
  document.addEventListener("visibilitychange", tick);
  window.addEventListener("load", tick);
})();
