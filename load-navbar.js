(function() {
    // Detect if we are inside a subfolder
    const pathToNavbar = window.location.pathname.includes('/')
        ? (window.location.pathname.split('/').length > 3 ? '../navbar.html' : 'navbar.html')
        : 'navbar.html';

    fetch(pathToNavbar)
        .then(res => res.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;

            // Load main script.js after navbar is injected
            const script = document.createElement('script');
            script.src = pathToNavbar.startsWith('../') ? '../script.js' : 'script.js';
            document.body.appendChild(script);
        })
        .catch(err => console.error('Error loading navbar:', err));
})();
