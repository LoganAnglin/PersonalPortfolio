(function () {
  var inSubdir = /\/projectTypes\//.test(window.location.pathname);
  var navbarPath = inSubdir ? '../navbar.html' : 'navbar.html';
  var basePrefix = inSubdir ? '../' : '';

  function normalizeLinks(container) {
    var anchors = container.querySelectorAll('a[href]');
    anchors.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (!href) return;
      if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('/')) return;
      if (basePrefix && !href.startsWith(basePrefix)) {
        a.setAttribute('href', basePrefix + href);
      }
    });
  }

  function setNavHeightVar(container) {
    var nav = container.querySelector('nav');
    if (!nav) return;
    var h = nav.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--nav-height', Math.round(h) + 'px');
  }

  fetch(navbarPath)
    .then(function (res) { return res.text(); })
    .then(function (html) {
      var container = document.getElementById('navbar');
      if (!container) { console.error('No #navbar element found'); return; }
      container.innerHTML = html;

      normalizeLinks(container);
      setNavHeightVar(container);

      // Recompute on resize (e.g., orientation change)
      var resizeHandler = function () { setNavHeightVar(container); };
      window.addEventListener('resize', resizeHandler);
      window.addEventListener('orientationchange', resizeHandler);

      // Load main script.js once
      if (!document.querySelector('script[data-main="script.js"]')) {
        var s = document.createElement('script');
        s.src = basePrefix + 'script.js';
        s.dataset.main = 'script.js';
        document.body.appendChild(s);
      }
    })
    .catch(function (err) {
      console.error('Error loading navbar:', err);
    });
})();
