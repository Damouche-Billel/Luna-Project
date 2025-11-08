// luna website js

document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // intersection observer for navbar on scroll
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
    
    // escape key closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuToggle.focus();
        }
    });
    
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

// ============================================
// CAST & CREW CAROUSEL
// ============================================

function initCastCarousel() {
    const carousel = document.querySelector('.cast-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const paginationContainer = document.querySelector('.carousel-pagination');
    const cards = Array.from(track.querySelectorAll('.cast-card'));

    if (!track || !prevBtn || !nextBtn || !paginationContainer || cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function calculateCardsPerView() {
        const width = window.innerWidth;
        if (width < 480) return 1;
        if (width < 768) return 2;
        if (width < 1200) return 3;
        return 4;
    }

    function updateCarouselPosition() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 28;
        const translateX = -(currentIndex * (cardWidth + gap));
        
        track.style.transition = prefersReducedMotion ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${translateX}px)`;
        updatePagination();
        updateNavButtons();
    }

    function createPagination() {
        const totalPages = Math.ceil(cards.length / cardsPerView);
        paginationContainer.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('pagination-dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            paginationContainer.appendChild(dot);
        }
        
        updatePagination();
    }

    function updatePagination() {
        const dots = paginationContainer.querySelectorAll('.pagination-dot');
        const activeIndex = Math.floor(currentIndex / cardsPerView);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
            dot.toggleAttribute('aria-current', index === activeIndex);
        });
    }

    function updateNavButtons() {
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        prevBtn.setAttribute('aria-disabled', currentIndex === 0);
        nextBtn.setAttribute('aria-disabled', currentIndex >= maxIndex);
    }

    function goToSlide(pageIndex) {
        currentIndex = Math.min(pageIndex * cardsPerView, cards.length - cardsPerView);
        updateCarouselPosition();
    }

    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex = Math.max(0, currentIndex - cardsPerView);
            updateCarouselPosition();
        }
    }

    function goToNext() {
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        if (currentIndex < maxIndex) {
            currentIndex = Math.min(maxIndex, currentIndex + cardsPerView);
            updateCarouselPosition();
        }
    }

    function handleKeyboard(event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goToPrev();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            goToNext();
        }
    }

    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    carousel.addEventListener('keydown', handleKeyboard);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newCardsPerView = calculateCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                currentIndex = 0;
                createPagination();
                updateCarouselPosition();
            }
        }, 250);
    });

    cardsPerView = calculateCardsPerView();
    createPagination();
    updateCarouselPosition();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCastCarousel);
} else {
    initCastCarousel();
}

// ============================================
// GALLERY SCROLL REVEAL
// ============================================

function initGalleryReveal() {
    const galleryItems = document.querySelectorAll('.gallery-item[data-reveal]');
    if (galleryItems.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        galleryItems.forEach(item => item.classList.add('visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => observer.observe(item));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryReveal);
} else {
    initGalleryReveal();
}

// reviews carousel interaction handler
function initReviewsCarousel() {
    const track = document.querySelector('.reviews-track');
    const slides = document.querySelectorAll('.review-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    
    // dynamically generate navigation dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Go to review ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // navigate to a specific review slide
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
        updateButtons();
    }
    
    // highlight the active navigation dot
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // disable navigation buttons at carousel boundaries
    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === slides.length - 1;
    }
    
    // handle previous and next button clicks
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) goToSlide(currentIndex + 1);
    });
    
    // enable arrow key navigation
    track.parentElement.parentElement.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    updateButtons();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewsCarousel);
} else {
    initReviewsCarousel();
}

// FAQ accordion interaction
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// contact form submission handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // simple success feedback (customize as needed)
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initFAQAccordion();
        initSmoothScroll();
        initContactForm();
    });
} else {
    initFAQAccordion();
    initSmoothScroll();
    initContactForm();
}
