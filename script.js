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

(function () {
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
           (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS
  }

  async function forceDownload(pdfPath, fileName) {
    const res = await fetch(pdfPath, { mode: 'same-origin' });
    if (!res.ok) throw new Error('Network error ' + res.status);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    // Standard download path (works on most browsers)
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName || 'download.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
  }

  document.addEventListener('click', async function (e) {
    const btn = e.target.closest('.js-download');
    if (!btn) return;

    e.preventDefault();

    const pdfPath  = btn.getAttribute('data-pdf') || btn.getAttribute('href');
    const fileName = btn.getAttribute('data-filename') || 'download.pdf';
    const zipPath  = btn.getAttribute('data-zip'); // optional iOS fallback

    try {
      if (isIOS()) {
        // iOS reliably downloads ZIPs; PDFs open in viewer.
        if (zipPath) {
          window.location.href = zipPath; // triggers download
          return;
        }
        // No ZIP provided — open PDF (user can Share -> Save to Files)
        window.open(pdfPath, '_blank');
        return;
      }
      // Non-iOS: do a blob download
      await forceDownload(pdfPath, fileName);
    } catch (err) {
      console.error('Download failed:', err);
      // Final fallback: open PDF in a new tab
      window.open(pdfPath, '_blank');
    }
  }, false);
})();


