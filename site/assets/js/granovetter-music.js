/* Mini player de música: Coldplay – Paradise (vídeo oficial no YouTube).
   Navegadores bloqueiam áudio automático, então o player começa no primeiro
   clique ou tecla do visitante (o "Enter site" da intro já conta) e repete
   sem parar. Fica visível no canto, com botão de som e de fechar. */
(function () {
  var VIDEO = "1G4isv_Fylg";
  var LANG_EN = document.documentElement.lang && document.documentElement.lang.indexOf("en") === 0;
  var T = LANG_EN
    ? { mute: "Mute", unmute: "Unmute", close: "Close player", label: "Now playing" }
    : { mute: "Silenciar", unmute: "Ativar som", close: "Fechar player", label: "Tocando agora" };

  var css = document.createElement("style");
  css.textContent =
    "#gv-music{position:fixed;left:16px;bottom:16px;z-index:2147483000;width:220px;" +
    "background:#0b0b0d;border:1px solid #33333a;border-radius:12px;overflow:hidden;" +
    "font-family:'Space Mono',monospace;color:#ededee;box-shadow:0 10px 30px rgba(0,0,0,.45);" +
    "opacity:0;transform:translateY(12px);transition:opacity .4s,transform .4s;pointer-events:none}" +
    "#gv-music.on{opacity:1;transform:none;pointer-events:auto}" +
    "#gv-music .gv-frame{position:relative;width:100%;aspect-ratio:16/9;background:#000}" +
    "#gv-music .gv-frame>*{position:absolute;inset:0;width:100%;height:100%;border:0}" +
    "#gv-music .gv-bar{display:flex;align-items:center;gap:8px;padding:8px 10px;font-size:10px;" +
    "letter-spacing:.08em;text-transform:uppercase}" +
    "#gv-music .gv-t{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#b7b7b7}" +
    "#gv-music button{background:none;border:1px solid #33333a;border-radius:8px;color:#ededee;" +
    "font:inherit;padding:4px 7px;cursor:pointer}" +
    "#gv-music button:hover{border-color:#ededee}" +
    "@media (max-width:600px){#gv-music{width:170px;left:12px;bottom:12px}}";
  document.head.appendChild(css);

  var box = document.createElement("div");
  box.id = "gv-music";
  box.setAttribute("role", "region");
  box.setAttribute("aria-label", T.label + ": Coldplay – Paradise");
  box.innerHTML =
    '<div class="gv-frame"><div id="gv-music-player"></div></div>' +
    '<div class="gv-bar"><span class="gv-t">♪ Coldplay – Paradise</span>' +
    '<button type="button" class="gv-mute" aria-label="' + T.mute + '">🔊</button>' +
    '<button type="button" class="gv-x" aria-label="' + T.close + '">✕</button></div>';
  document.body.appendChild(box);

  var player = null, ready = false, wantPlay = false, closed = false;
  var muteBtn = box.querySelector(".gv-mute");

  function play() {
    if (closed) return;
    wantPlay = true;
    box.classList.add("on");
    if (ready) { player.unMute(); player.playVideo(); }
  }

  muteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!ready) return;
    if (player.isMuted()) { player.unMute(); muteBtn.textContent = "🔊"; muteBtn.setAttribute("aria-label", T.mute); }
    else { player.mute(); muteBtn.textContent = "🔇"; muteBtn.setAttribute("aria-label", T.unmute); }
  });
  box.querySelector(".gv-x").addEventListener("click", function (e) {
    e.stopPropagation();
    closed = true;
    if (ready) player.stopVideo();
    box.remove();
  });

  function firstGesture() {
    window.removeEventListener("pointerdown", firstGesture, true);
    window.removeEventListener("keydown", firstGesture, true);
    play();
  }
  window.addEventListener("pointerdown", firstGesture, true);
  window.addEventListener("keydown", firstGesture, true);

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
          // reforço do loop: ao terminar, volta ao início
          if (ev.data === YT.PlayerState.ENDED) { player.seekTo(0); player.playVideo(); }
        }
      }
    });
  };
  var s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(s);
})();
