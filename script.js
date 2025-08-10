// ===== Navbar interactions (works on root + /projectTypes/) =====
(function(){
  function initNav(){
    var nav = document.querySelector('.navbar');
    var toggle = document.querySelector('.nav-toggle');
    var panel = document.getElementById('nav-links');
    if (!nav || !toggle || !panel) return;

    var openClass = 'open';

    function setExpanded(open){
      toggle.setAttribute('aria-expanded', String(open));
      panel.classList.toggle(openClass, open);
      // Recompute height after menu opens/closes (mobile)
      var h = nav.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--nav-height', Math.round(h) + 'px');
    }

    toggle.addEventListener('click', function(){
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!isOpen);
    });

    // Close when a link is clicked (mobile)
    panel.addEventListener('click', function(e){
      var a = e.target.closest('a');
      if (a) setExpanded(false);
    });

    // Click-away to close
    document.addEventListener('click', function(e){
      if (!panel.classList.contains(openClass)) return;
      if (e.target.closest('.navbar')) return;
      setExpanded(false);
    });

    // ESC to close
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') setExpanded(false);
    });

    // Close on resize to desktop layout
    var mq = window.matchMedia('(min-width: 821px)');
    mq.addEventListener('change', function(){
      setExpanded(false);
    });

    // Initial height (in case fonts load later)
    window.setTimeout(function(){
      var h = nav.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--nav-height', Math.round(h) + 'px');
    }, 0);
  }

  // Run after DOM has navbar injected by load-navbar.js
  if (document.readyState === 'complete' || document.readyState === 'interactive'){
    initNav();
  } else {
    document.addEventListener('DOMContentLoaded', initNav);
  }
})();
