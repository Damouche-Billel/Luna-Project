// luna website js

document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // handle navbar on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50 || window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    document.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
    document.addEventListener('visibilitychange', handleNavbarScroll);
    
    // intersection observer for scroll snap
    const firstSection = document.querySelector('section:first-of-type, .greeting-section, .story-hero');
    if (firstSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio < 0.9) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                });
            },
            { threshold: [0, 0.1, 0.5, 0.9, 1] }
        );
        observer.observe(firstSection);
    }

    
    // mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        const closeMenu = document.querySelector('.close-menu');
        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        navMenu.addEventListener('click', function(e) {
            if (e.target === navMenu) {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // fade in animations
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
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // escape key closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuToggle.focus();
        }
    });
    
    // page load fade in
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // storyline envelope
    const storylineContainer = document.querySelector('.storyline-envelope');
    
    if (storylineContainer) {
        storylineContainer.addEventListener('click', function() {
            this.classList.toggle('open');
        });
        
        storylineContainer.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('open');
            }
        });
        
        storylineContainer.setAttribute('tabindex', '0');
        storylineContainer.setAttribute('aria-label', 'Click to open the letter');
        storylineContainer.setAttribute('role', 'button');
        
        // handle scroll for letter content
        const letterBody = document.querySelector('.letter-body');
        if (letterBody) {
            letterBody.addEventListener('wheel', function(e) {
                // ignore if closed
                if (!storylineContainer.classList.contains('open')) {
                    return;
                }
                
                const scrollingDown = e.deltaY > 0;
                const atTop = this.scrollTop === 0;
                const atBottom = Math.abs(this.scrollHeight - this.scrollTop - this.clientHeight) < 1;
                
                // handle scrolling inside letter
                if ((scrollingDown && !atBottom) || (!scrollingDown && !atTop)) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.scrollTop += e.deltaY;
                }
            });
        }
    }
    
    // trailer envelope with video
    const trailerContainer = document.querySelector('.trailer-envelope');
    
    if (trailerContainer) {
        const trailerVideo = document.getElementById('trailerVideo');
        const closeBtn = trailerContainer.querySelector('.video-close-btn');
        
        // mobile check
        const isMobile = () => window.innerWidth <= 480;
        
        // click to play (desktop only)
        trailerContainer.addEventListener('click', function(e) {
            // let iframe handle on mobile
            if (isMobile()) {
                return;
            }
            
            // ignore close button clicks
            if (e.target.closest('.video-close-btn')) {
                return;
            }
            
            if (!this.classList.contains('open')) {
                this.classList.add('open');
                // play video via YouTube API
                if (trailerVideo) {
                    trailerVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                }
            }
        });
        
        // close button
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                trailerContainer.classList.remove('open');
                // pause on close
                if (trailerVideo) {
                    trailerVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            });
        }
        
        // keyboard support (desktop only)
        trailerContainer.addEventListener('keydown', function(e) {
            // ignore on mobile
            if (isMobile()) {
                return;
            }
            
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('open');
                
                if (this.classList.contains('open') && trailerVideo) {
                    trailerVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                } else if (trailerVideo) {
                    trailerVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
        });
        
        // accessibility attrs for desktop
        if (!isMobile()) {
            trailerContainer.setAttribute('tabindex', '0');
            trailerContainer.setAttribute('aria-label', 'Click to watch trailer');
            trailerContainer.setAttribute('role', 'button');
        }
    }
    
    // click outside to close
    document.addEventListener('click', function(e) {
        // mobile check
        const isMobile = window.innerWidth <= 480;
        
        // close storyline if clicking outside
        if (storylineContainer && storylineContainer.classList.contains('open')) {
            if (!storylineContainer.contains(e.target)) {
                storylineContainer.classList.remove('open');
            }
        }
        
        // close trailer if clicking outside (desktop only)
        if (!isMobile && trailerContainer && trailerContainer.classList.contains('open')) {
            if (!trailerContainer.contains(e.target)) {
                trailerContainer.classList.remove('open');
                // pause on close
                const trailerVideo = document.getElementById('trailerVideo');
                if (trailerVideo) {
                    trailerVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
        }
    });

});

/* ============================================
   DIRECTOR'S STATEMENT SECTION
   ============================================ */

// check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// fade in section when it comes into view
const dirSection = document.querySelector('.dir-section');

if (dirSection && !prefersReducedMotion) {
    const dirObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    dirObserver.observe(dirSection);
}

// add subtle parallax to starfield on scroll
const dirStarfield = document.querySelector('.dir-starfield');

if (dirStarfield && !prefersReducedMotion) {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const sectionTop = dirSection?.offsetTop || 0;
        const sectionHeight = dirSection?.offsetHeight || 0;
        
        // only move stars when section is visible
        if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const relativeScroll = scrolled - sectionTop;
            const parallaxValue = relativeScroll * 0.15;
            dirStarfield.style.transform = `translateY(${Math.min(parallaxValue, 12)}px)`;
        }
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}