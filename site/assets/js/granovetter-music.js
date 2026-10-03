/* Mini player de música: Coldplay – Paradise (vídeo oficial no YouTube).
   Navegadores bloqueiam áudio automático, então o player começa no primeiro
   clique ou tecla do visitante (o "Enter site" da intro já conta) e repete
   sem parar. Fica recolhido numa pílula discreta no canto; abre ao passar o mouse. */
(function () {
  var VIDEO = "1G4isv_Fylg";
  var LANG_EN = document.documentElement.lang && document.documentElement.lang.indexOf("en") === 0;
  var T = LANG_EN
    ? { mute: "Mute", unmute: "Unmute", close: "Close player", label: "Now playing", tap: "▶ Tap play to listen" }
    : { mute: "Silenciar", unmute: "Ativar som", close: "Fechar player", label: "Tocando agora", tap: "▶ Toque no play para ouvir" };

  var css = document.createElement("style");
  css.textContent =
    "#gv-music{position:fixed;right:14px;bottom:14px;z-index:2147483000;display:flex;align-items:center;gap:8px;" +
    "height:34px;padding:3px 8px 3px 3px;background:rgba(11,11,13,.72);border:1px solid rgba(255,255,255,.12);" +
    "border-radius:999px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#ededee;" +
    "font-family:'Space Mono',monospace;font-size:10px;letter-spacing:.06em;" +
    "opacity:0;pointer-events:none;transition:opacity .4s,height .3s,border-radius .3s,padding .3s}" +
    "#gv-music.on{opacity:.55;pointer-events:auto}" +
    "#gv-music.on:hover,#gv-music.on.open,#gv-music.on:focus-within{opacity:1}" +
    "#gv-music .gv-frame{position:relative;width:48px;height:27px;border-radius:999px;overflow:hidden;background:#000;" +
    "flex:none;transition:width .3s,height .3s,border-radius .3s}" +
    "#gv-music .gv-frame>*{position:absolute;inset:0;width:100%;height:100%;border:0}" +
    "#gv-music .gv-eq{display:flex;align-items:flex-end;gap:2px;height:12px}" +
    "#gv-music .gv-eq i{width:2px;background:#ededee;animation:gvEq 1s ease-in-out infinite}" +
    "#gv-music .gv-eq i:nth-child(2){animation-delay:-.3s}#gv-music .gv-eq i:nth-child(3){animation-delay:-.6s}" +
    "#gv-music.muted .gv-eq i{animation:none;height:2px}" +
    "@keyframes gvEq{0%,100%{height:3px}50%{height:12px}}" +
    "#gv-music .gv-t{display:none;white-space:nowrap;color:#b7b7b7}" +
    "#gv-music button{background:none;border:0;color:#ededee;font:inherit;font-size:12px;padding:2px 4px;cursor:pointer;line-height:1}" +
    "#gv-music .gv-x{display:none}" +
    /* aberto: mostra o vídeo maior, o título e o fechar */
    "#gv-music.on:hover,#gv-music.open{height:auto;flex-wrap:wrap;width:200px;border-radius:12px;padding:6px}" +
    "#gv-music.on:hover .gv-frame,#gv-music.open .gv-frame{width:100%;height:auto;aspect-ratio:16/9;border-radius:8px}" +
    "#gv-music.on:hover .gv-t,#gv-music.open .gv-t{display:block;flex:1;overflow:hidden;text-overflow:ellipsis}" +
    "#gv-music.on:hover .gv-x,#gv-music.open .gv-x{display:inline}" +
    "#gv-music .gv-hint{display:none;width:100%;font-size:11px;letter-spacing:.02em;color:#ededee;padding:2px 2px 0}" +
    "#gv-music.on.needs-tap{opacity:1;height:auto;flex-wrap:wrap;width:240px;border-radius:12px;padding:6px;border-color:rgba(233,74,18,.7)}" +
    "#gv-music.on.needs-tap .gv-frame{width:100%;height:auto;aspect-ratio:16/9;border-radius:8px}" +
    "#gv-music.on.needs-tap .gv-t{display:block;flex:1;overflow:hidden;text-overflow:ellipsis}" +
    "#gv-music.on.needs-tap .gv-x{display:inline}" +
    "#gv-music.on.needs-tap .gv-hint{display:block;order:-1;animation:gvPulse 1.6s ease-in-out infinite}" +
    "@keyframes gvPulse{0%,100%{opacity:1}50%{opacity:.55}}" +
    "@media (max-width:600px){#gv-music{right:10px;bottom:10px}}";
  document.head.appendChild(css);

  var box = document.createElement("div");
  box.id = "gv-music";
  box.setAttribute("role", "region");
  box.setAttribute("aria-label", T.label + ": Coldplay – Paradise");
  box.innerHTML =
    '<span class="gv-hint">' + T.tap + '</span>' +
    '<div class="gv-frame"><div id="gv-music-player"></div></div>' +
    '<span class="gv-eq" aria-hidden="true"><i></i><i></i><i></i></span>' +
    '<span class="gv-t">Coldplay – Paradise</span>' +
    '<button type="button" class="gv-mute" aria-label="' + T.mute + '">🔊</button>' +
    '<button type="button" class="gv-x" aria-label="' + T.close + '">✕</button>';
  document.body.appendChild(box);
  // no toque (sem hover), um toque na pílula abre/fecha
  box.addEventListener("click", function (e) {
    if (e.target.closest("button")) return;
    if (!window.matchMedia("(hover: hover)").matches) box.classList.toggle("open");
  });

  var player = null, ready = false, wantPlay = false, closed = false;
  var muteBtn = box.querySelector(".gv-mute");

  var playing = false, fallbackTimer = null, blocked = false;
  function setMutedUI(m) {
    box.classList.toggle("muted", m);
    muteBtn.textContent = m ? "🔇" : "🔊";
    muteBtn.setAttribute("aria-label", m ? T.unmute : T.mute);
  }
  // chamada sempre dentro de um clique/toque/tecla do visitante: é o que libera o som
  function play() {
    if (closed) return;
    wantPlay = true;
    box.classList.add("on");
    if (!ready) return;
    player.unMute(); setMutedUI(false); player.playVideo();
    clearTimeout(fallbackTimer);
    // plano B: se o navegador bloquear o som, toca mudo e a pílula mostra 🔇
    fallbackTimer = setTimeout(function () {
      if (closed || playing) return;
      // o navegador bloqueou o som: deixa o player aberto e parado, com o botão de
      // play do YouTube à vista; um toque nele (dentro do player) libera o áudio
      blocked = true;
      player.unMute(); setMutedUI(false);
      box.classList.add("needs-tap");
    }, 2500);
  }

  muteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!ready) return;
    if (blocked) { box.classList.add("needs-tap"); return; }
    if (player.isMuted()) { player.unMute(); setMutedUI(false); if (!playing) player.playVideo(); }
    else { player.mute(); setMutedUI(true); }
  });
  box.querySelector(".gv-x").addEventListener("click", function (e) {
    e.stopPropagation();
    closed = true;
    if (ready) player.stopVideo();
    box.remove();
  });

  var resumeTimer = null;
  function resumeSoon() {
    if (!wantPlay || closed || !ready || blocked) return;
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () {
      if (document.visibilityState !== "visible") return; // retoma ao voltar
      var st = player.getPlayerState();
      if (st === YT.PlayerState.PAUSED || st === YT.PlayerState.CUED) player.playVideo();
    }, 400);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") resumeSoon();
  });
  // quando o visitante toca no vídeo e o som liga, volta à pílula discreta
  setInterval(function () {
    if (!ready || closed || !blocked) return;
    if (playing && !player.isMuted()) { blocked = false; box.classList.remove("needs-tap", "open"); setMutedUI(false); }
  }, 500);
  // rede de segurança: confere a cada 5 s se ainda está tocando
  setInterval(function () {
    if (!wantPlay || closed || !ready || blocked || document.visibilityState !== "visible") return;
    var st = player.getPlayerState();
    if (st === YT.PlayerState.PAUSED || st === YT.PlayerState.CUED || st === YT.PlayerState.ENDED) player.playVideo();
  }, 5000);

  // a cada interação, até a música estar tocando com som, tenta de novo dentro do gesto
  function onGesture(e) {
    if (closed) return;
    if (e && e.target && e.target.closest && e.target.closest("#gv-music")) return; // botões da pílula cuidam disso
    if (blocked) return;
    if (!playing || (ready && player.isMuted() && !userMuted)) play();
  }
  var userMuted = false;
  muteBtn.addEventListener("click", function () { userMuted = ready && player.isMuted(); });
  ["pointerdown", "keydown", "touchend"].forEach(function (ev) { window.addEventListener(ev, onGesture, true); });

  var prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    if (typeof prev === "function") prev();
    player = new YT.Player("gv-music-player", {
      host: "https://www.youtube-nocookie.com",
      videoId: VIDEO,
      playerVars: { loop: 1, playlist: VIDEO, controls: 1, modestbranding: 1, rel: 0, playsinline: 1 },
      events: {
        onReady: function () { ready = true; if (wantPlay) play(); },
        onStateChange: function (ev) {
          playing = ev.data === YT.PlayerState.PLAYING || ev.data === YT.PlayerState.BUFFERING;
          // reforço do loop: ao terminar, volta ao início
          if (ev.data === YT.PlayerState.ENDED) { player.seekTo(0); player.playVideo(); }
          // o YouTube ou o navegador às vezes pausam sozinhos (aba em segundo
          // plano, player pequeno); retoma enquanto o visitante quiser música
          if (ev.data === YT.PlayerState.PAUSED) resumeSoon();
        }
      }
    });
  };
  // a API do YouTube (~1 MB) carrega depois que a página termina de abrir (não pesa no
  // carregamento inicial) e já está pronta quando o visitante clicar para entrar
  var apiLoaded = false;
  function loadApi() {
    if (apiLoaded) return; apiLoaded = true;
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  }
  if (document.readyState === "complete") setTimeout(loadApi, 800);
  else window.addEventListener("load", function () { setTimeout(loadApi, 800); });
  window.addEventListener("pointerdown", loadApi, true);
  window.addEventListener("keydown", loadApi, true);
})();
