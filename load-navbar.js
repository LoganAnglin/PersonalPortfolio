// js/navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

  // Load the navbar HTML
  fetch("/components/navbar.html")
    .then(res => res.text())
    .then(html => {
      navbarContainer.innerHTML = html;

      // Fix links to work from any folder depth
      const baseUrl = window.location.origin + window.location.pathname.split('/')[1] + '/';
      document.querySelectorAll("#navbar-container a[data-page]").forEach(link => {
        const page = link.getAttribute("data-page");
        link.href = baseUrl + page;
      });

      // Toggle menu on small screens
      const menuIcon = document.getElementById("menu-icon");
      const navLinks = document.getElementById("nav-links");

      menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    })
    .catch(err => console.error("Error loading navbar:", err));
});
