// luna website javascript

document.addEventListener('DOMContentLoaded', function() {
    
    // navigation elements
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // navbar changes when scrolling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // mobile menu toggle functionality
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // stop background scrolling
        });
        
        // close menu when clicking the X button
        const closeMenu = document.querySelector('.close-menu');
        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // close menu when clicking outside
        navMenu.addEventListener('click', function(e) {
            if (e.target === navMenu) {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // active page highlighting
    
    // get current page name
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // highlight current nav link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // scroll animations
    
    // fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // social links click effects
    const socialLinks = document.querySelectorAll('.social-link');
    
    // add click animation to social buttons
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // click animation effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // keyboard accessibility
    
    // esc key closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuToggle.focus(); // put focus back
        }
    });
    
    // page load animation
    
    // fade in on page load
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
});