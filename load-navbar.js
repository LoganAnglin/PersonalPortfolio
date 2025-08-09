(function(){
  // find the <script> element that loaded this file
  var me = document.currentScript || (function(){
    var s = document.getElementsByTagName('script');
    return s[s.length-1];
  })();

  // derive base URL (folder containing assets/)
  var scriptUrl = me && me.src ? me.src : '';
  // remove trailing path to get base (e.g. https://.../REPO/assets/js/load-components.js -> https://.../REPO/)
  var base = scriptUrl.replace(/\/assets\/js\/load-components(\.min)?\.js(\?.*)?$/,'/');
  if (!base) base = '/';

  // inject CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = base + 'style.css';
  document.head.appendChild(link);

  // inject navbar HTML
  fetch(base + 'components/navbar.html')
    .then(function(r){ if(!r.ok) throw new Error('Navbar missing'); return r.text(); })
    .then(function(html){
      var placeholder = document.getElementById('navbar');
      if (!placeholder) {
        placeholder = document.createElement('div');
        placeholder.id = 'navbar';
        document.body.insertBefore(placeholder, document.body.firstChild);
      }
      placeholder.innerHTML = html;

      // fix relative links in navbar: if href doesn't start with http or /, prefix with base
      document.querySelectorAll('#navbar a').forEach(function(a){
        var href = a.getAttribute('href') || a.dataset.href;
        if (href && !/^[a-zA-Z]+:\/\//.test(href) && !href.startsWith('/')) {
          a.href = base + href;
        }
      });

      // load the menu toggle script and run setup
      var s = document.createElement('script');
      s.src = base + 'script.js';
      s.onload = function(){
        if (typeof setupNavbarToggle === 'function') setupNavbarToggle();
      };
      document.body.appendChild(s);
    })
    .catch(function(err){
      console.error('Failed to load navbar:', err);
    });
})();
