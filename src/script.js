// luna website js

document.addEventListener('DOMContentLoaded', function() {
    
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // intersection observer for navbar on scroll
    const firstSection = document.querySelector('.nav-trigger, section:first-of-type, .greeting-section, .story-hero');
    if (firstSection && navbar) {
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
    } else if (navbar) {
        // fallback: if no section found, use scroll position
        const toggleNavByScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        toggleNavByScroll();
        window.addEventListener('scroll', toggleNavByScroll);
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

// parallax on starfield
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
    
    // generate navigation dots
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

// scroll for anchor links
function initScrollForAnchors() {
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

// scroll animations
function initScrollAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    // Fade-in sections on scroll
    const sections = document.querySelectorAll('.story-teaser-section, .cast-crew-section, .gallery-section, .reviews-section, .contact-visit-section, .newsletter-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });
    
    // parallax for hero background
    const heroGif = document.querySelector('.greeting-park-timelapse');
    if (heroGif) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroSection = document.querySelector('.greeting-section');
                    
                    if (heroSection && scrolled < window.innerHeight) {
                        heroGif.style.transform = `translateY(${scrolled * 0.4}px)`;
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
}

// newsletter form
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    const successMessage = document.getElementById('newsletterSuccess');
    const submitBtn = form ? form.querySelector('.newsletter-button') : null;
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        
        if (!email) return;
        
        // disable button during submission
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
        }
        
        try {
            // send to PHP backend
            const response = await fetch('api/newsletter-subscribe.php', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });
        
        // Check if response is ok
        if (!response.ok) {
            const text = await response.text();
            console.error('Server response:', text);
            throw new Error(`Server error: ${response.status}`);
        }
        
        // Try to parse JSON response
        let data;
        try {
            data = await response.json();
        } catch (e) {
            const text = await response.text();
            console.error('Non-JSON response:', text);
            throw new Error('Server returned invalid response');
        }
        
        if (data.success) {
            // fade out form
            form.classList.add('submitted');                // update success message
                const successText = successMessage.querySelector('p');
                if (successText) successText.textContent = data.message;
                
                // show success message
                setTimeout(() => {
                    successMessage.classList.add('visible');
                    
                    // fade out after 3 seconds
                    setTimeout(() => {
                        successMessage.classList.add('fade-out');
                        
                        // reset form after fade out completes
                        setTimeout(() => {
                            form.classList.remove('submitted');
                            successMessage.classList.remove('visible', 'fade-out');
                            form.reset();
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.textContent = 'Stay Connected';
                            }
                        }, 1500);
                    }, 3000);
                }, 600);
            } else {
                // show error
                alert(data.message || 'Subscription failed. Please try again.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Stay Connected';
                }
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            alert('Unable to connect to server. Please try again later.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Stay Connected';
            }
        }
    });
}

// director statement parallax and fade-in
function initDirectorStatement() {
    const directorSection = document.querySelector('.director-statement-section');
    const directorLayout = document.querySelector('.director-layout');
    const directorHeading = document.querySelector('.director-heading');
    
    if (!directorSection || !directorLayout) return;
    
    // fade-in on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                directorLayout.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    observer.observe(directorSection);
    
    // parallax effect for heading
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && directorHeading) {
        window.addEventListener('scroll', () => {
            const rect = directorSection.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            
            if (scrollPercent >= 0 && scrollPercent <= 1) {
                const translateY = (scrollPercent - 0.5) * 30;
                directorHeading.style.transform = `translateY(${translateY}px)`;
            }
        }, { passive: true });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initFAQAccordion();
        initScrollForAnchors();
        initContactForm();
        initScrollAnimations();
        initNewsletter();
        initDirectorStatement();
        initNewsletterPopup();
    });
} else {
    initFAQAccordion();
    initScrollForAnchors();
    initContactForm();
    initScrollAnimations();
    initNewsletter();
    initDirectorStatement();
    initNewsletterPopup();
}

/* newsletter popup */
function initNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    if (!popup) return;
    
    const closeBtn = document.getElementById('popupClose');
    const form = document.getElementById('popupForm');
    const emailInput = document.getElementById('popupEmail');
    const content = document.getElementById('popupContent');
    const success = document.getElementById('popupSuccess');
    
    let hasShown = false;
    
    /* show popup after 20 seconds */
    setTimeout(() => {
        if (!hasShown) {
            hasShown = true;
            requestAnimationFrame(() => {
                popup.classList.remove('hidden');
                popup.classList.add('visible');
            });
        }
    }, 20000);
    
    /* hide popup */
    function hidePopup() {
        popup.classList.remove('visible');
        popup.classList.add('hidden');
    }
    
    /* handle form submit */
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (!email) return;
        
        const submitBtn = form.querySelector('.popup-button');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
        }
        
        try {
            // send to PHP backend
            const response = await fetch('api/newsletter-subscribe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            
            // Check if response is ok
            if (!response.ok) {
                const text = await response.text();
                console.error('Server response:', text);
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                content.style.display = 'none';
                
                // update success message
                const successText = success.querySelector('p');
                if (successText) successText.textContent = data.message;
                
                success.classList.add('visible');
                
                setTimeout(() => {
                    hidePopup();
                    
                    setTimeout(() => {
                        form.reset();
                        content.style.display = 'block';
                        success.classList.remove('visible');
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Subscribe';
                        }
                    }, 600);
                }, 2000);
            } else {
                alert(data.message || 'Subscription failed. Please try again.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Subscribe';
                }
            }
        } catch (error) {
            console.error('Newsletter popup error:', error);
            alert('Unable to connect to server. Please try again later.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }
        }
    });
    
    /* handle close button */
    closeBtn.addEventListener('click', () => {
        hidePopup();
    });
    
    /* handle click outside */
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            hidePopup();
        }
    });
    
    /* handle escape key */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('visible')) {
            hidePopup();
        }
    });
}

/* ------------------ SHUAYB LOGIC ------------------ */
// FAQ Dropdown Toggle (only one open at a time)
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions.length === 0) return;

  faqQuestions.forEach(button => {
    button.addEventListener("click", () => {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all items first
      document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));

      // If it wasn't active before, open it
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });
}

// ==========  Script Animation Stuff For Multiple Slideshows (Updated for Full-Width Fit) ==========
function initGallerySlideshows() {
  // Only run if gallery slideshows exist
  if (!document.getElementById('slideshow1') && !document.getElementById('slideshow2')) return;

  function initSlideshow(slideshowId, trackId, prevId, nextId, dotsId) {
    const slideshow = document.getElementById(slideshowId);
    const track = document.getElementById(trackId);
    if (!slideshow || !track) return;

    const slides = Array.from(track.children);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const dotsWrap = document.getElementById(dotsId);

    let active = 0;
    let autoplayTimer = null;
    const INTERVAL = 3000;

    // Ensure track matches slideshow width
 function resizeSlides() {
    const slideWidth = slideshow.getBoundingClientRect().width;

    slides.forEach(slide => {
        slide.style.minWidth = slideWidth + "px";
        slide.style.maxWidth = slideWidth + "px";
    });

    // Ensure track fits 100% on all devices
    track.style.width = (slideWidth * slides.length) + "px";

    updateUI();
}


    // Build dots dynamically
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.dataset.index = i;
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function updateUI() {
      const slideWidth = slideshow.clientWidth;
      const offset = -active * slideWidth;
      track.style.transform = `translateX(${offset}px)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === active));
    }

    function goTo(index) {
      active = (index + slides.length) % slides.length;
      updateUI();
    }

    function next() {
      goTo(active + 1);
    }

    function prev() {
      goTo(active - 1);
    }

    // Button navigation
    nextBtn?.addEventListener("click", () => {
      next();
      resetAutoplay();
    });
    prevBtn?.addEventListener("click", () => {
      prev();
      resetAutoplay();
    });

    // Dot navigation
    dotsWrap.addEventListener("click", (e) => {
      if (e.target.classList.contains("dot")) {
        goTo(Number(e.target.dataset.index));
        resetAutoplay();
      }
    });

    // Autoplay behavior
    function startAutoplay() {
      if (autoplayTimer) return;
      autoplayTimer = setInterval(next, INTERVAL);
    }
    function stopAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    slideshow.addEventListener("mouseenter", startAutoplay);
    slideshow.addEventListener("mouseleave", stopAutoplay);

    // Touch swipe
    let startX = null;
    slideshow.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      stopAutoplay();
    });
    slideshow.addEventListener("touchmove", (e) => {
      if (!startX) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 60) {
        dx > 0 ? prev() : next();
        startX = null;
      }
    });
    slideshow.addEventListener("touchend", () => {
      startX = null;
    });

    // Resize listener for responsive fit
    window.addEventListener("resize", resizeSlides);

    // Initialize
    resizeSlides();
    goTo(0);
  }

  // Initialize both slideshows
  initSlideshow("slideshow1", "track1", "prevBtn1", "nextBtn1", "dots1");
  initSlideshow("slideshow2", "track2", "prevBtn2", "nextBtn2", "dots2");
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallerySlideshows);
} else {
    initGallerySlideshows();
}

// ============================================
// INDEX HOME GALLERY SCROLL REVEAL
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

// STORY PAGE JAVASCRIPT SECTION  //

// mouse wheel scroll handling for letter content
const letterBody = document.querySelector('.letter-body');
if (letterBody) {
    letterBody.addEventListener('wheel', function(e) {
        // skip handling if letter is closed
        if (!letterContainer.classList.contains('open')) {
            return;
        }
        
        const scrollingDown = e.deltaY > 0;
        const atTop = this.scrollTop === 0;
        const atBottom = Math.abs(this.scrollHeight - this.scrollTop - this.clientHeight) < 1;
        
        // handle scroll when inside content area
        if ((scrollingDown && !atBottom) || (!scrollingDown && !atTop)) {
            e.preventDefault();
            e.stopPropagation();
            this.scrollTop += e.deltaY;
        }
    });
}



