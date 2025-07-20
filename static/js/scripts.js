// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Handles smooth scrolling for anchor links.
     * Finds all links starting with '#' and adds a click event listener.
     */
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    for (const scrollLink of scrollLinks) {
        scrollLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /**
     * Adds an 'active' class to the current page's navigation link.
     * This provides a visual indicator to the user about which page they are on.
     */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Special handling for the home page, which might be '/', '/home', or '/index.html'
        if ((linkPath === '/' || linkPath === '/home' || linkPath === '/index') && (currentPath === '/' || currentPath === '/home' || currentPath.endsWith('/index.html'))) {
             link.classList.add('active');
        } 
        // For all other pages, check if the path includes the link's href
        else if (linkPath !== '/' && currentPath.includes(linkPath)) {
            link.classList.add('active');
        }
    });
});
