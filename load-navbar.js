function toggleMenu(button) {
    button.classList.toggle("active");
    document.getElementById("nav-links").classList.toggle("active");
}

// Automatically adjust links based on folder depth
(function adjustNavLinks() {
    const depth = window.location.pathname.split("/").length - 2; 
    // e.g., /folder/page.html → depth=1, / → depth=0
    const prefix = "../".repeat(depth);

    document.querySelectorAll(".navbar a").forEach(link => {
        let href = link.getAttribute("href");
        if (!href.startsWith("http") && !href.startsWith(prefix)) {
            link.setAttribute("href", prefix + href);
        }
    });
})();
