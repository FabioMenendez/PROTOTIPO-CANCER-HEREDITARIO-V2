// assets/js/offcanvas.js
document.addEventListener('DOMContentLoaded', function () {
  var toggle   = document.getElementById('navToggle');
  var panel    = document.getElementById('menu');
  var closeBtn = panel ? panel.querySelector('.offcanvas-close') : null;
  var backdrop = document.getElementById('offcanvasBackdrop');

  // Si no están los elementos requeridos, no hacemos nada
  if (!toggle || !panel || !backdrop) return;

  // Por si existe algún <a href="#menu"> del template viejo, lo anulamos
  document.querySelectorAll('a[href="#menu"]').forEach(function(a){
    a.addEventListener('click', function(e){ e.preventDefault(); });
  });

  var lastFocus = null;
  function focusables() {
    return panel.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"]), input, select, textarea');
  }
  var firstEl, lastEl;
  function setTrap(){ var n = focusables(); firstEl = n[0]; lastEl = n[n.length - 1]; }

  function openPanel(){
    lastFocus = document.activeElement;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden','false');
    toggle.setAttribute('aria-expanded','true');
    backdrop.hidden = false;
    setTrap();
    (firstEl || panel).focus({preventScroll:true});
    document.body.style.overflow = 'hidden';
  }

  function closePanel(){
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden','true');
    toggle.setAttribute('aria-expanded','false');
    backdrop.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true});
  }

  toggle.addEventListener('click', function(){
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });
  if (closeBtn) closeBtn.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);

  // Teclado: ESC cierra, TAB atrapa el foco dentro del panel
  document.addEventListener('keydown', function(e){
    if (!panel.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closePanel(); }
    if (e.key === 'Tab') {
      setTrap(); if (!firstEl || !lastEl) return;
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    }
  });

  // Cerrar al navegar por un link
  panel.querySelectorAll('a[href]').forEach(function(a){
    a.addEventListener('click', closePanel);
  });
});



