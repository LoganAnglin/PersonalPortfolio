(function() {
  // Are we inside /projectTypes/ ?
  var inSubdir = /\/projectTypes\//.test(window.location.pathname);
  var navbarPath = inSubdir ? '../navbar.html' : 'navbar.html';
  var basePrefix = inSubdir ? '../' : '';

  fetch(navbarPath)
    .then(function(res){ return res.text(); })
    .then(function(html){
      var container = document.getElementById('navbar');
      if(!container){ 
        console.error('No #navbar element found');
        return;
      }
      container.innerHTML = html;

      // Normalize relative links in the injected navbar
      var anchors = container.querySelectorAll('a[href]');
      anchors.forEach(function(a){
        var href = a.getAttribute('href');
        if (!href) return;
        // Skip absolute/anchors/mailto and root-absolute paths
        if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('/')) return;
        if (basePrefix && !href.startsWith(basePrefix)) {
          a.setAttribute('href', basePrefix + href);
        }
      });

      // Load main script.js once
      if (!document.querySelector('script[data-main="script.js"]')) {
        var s = document.createElement('script');
        s.src = basePrefix + 'script.js';
        s.dataset.main = 'script.js';
        document.body.appendChild(s);
      }
    })
    .catch(function(err){
      console.error('Error loading navbar:', err);
    });
})();
