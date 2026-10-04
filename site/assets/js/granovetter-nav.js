/* Marca no menu a seção que está na tela. A rolagem do site é virtual
   (transform), então a posição é lida por getBoundingClientRect. */
(function () {
  function update() {
    var probe = window.innerHeight * 0.35;
    document.querySelectorAll('.header .menu-list').forEach(function (list) {
      list.querySelectorAll('.menu-item').forEach(function (li) {
        var a = li.querySelector('a[href^="#"]');
        var id = a && a.getAttribute('href').slice(1);
        var el = id && document.getElementById(id === 'signup-contact' ? 'signup' : id);
        var on = false;
        if (el) { var r = el.getBoundingClientRect(); on = r.top <= probe && r.bottom > probe; }
        li.classList.toggle('active', on);
        if (a) { if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }
      });
    });
  }
  setInterval(update, 250);
  window.addEventListener('load', update);
})();
