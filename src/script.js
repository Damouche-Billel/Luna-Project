// luna website javascript stuff

document.addEventListener('DOMContentLoaded', function() {
    
    // navigation things
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
    
    // mobile menu toggle - should work better now with custom hamburger
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
        
        // close menu when clicking outside too
        navMenu.addEventListener('click', function(e) {
            if (e.target === navMenu) {
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // active page highlighting stuff
    
    // get current page name
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // highlight current nav link - not sure if best way but it works :)
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // animation stuff
    
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
            // little click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // keyboard stuff for accessibility
    
    // esc key closes mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuToggle.focus(); // put focus back
        }
    });
    
    // preloader stuff - maybe add later
    
    // simple fade in when page loads
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // ===============================================
    // PERFORMANCE OPTIMIZATIONS - Changes to ensure pages performs smoothly
    // ===============================================
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateScrollEffects() {
        // Navbar scroll effect (already handled above)
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
});

// FAQ Dropdown Toggle (only one open at a time)
document.querySelectorAll(".faq-question").forEach(button => {
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

// ==========  Script Animation Stuff For Multiple Slideshows (Updated for Full-Width Fit) ==========
(function () {
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
      const slideWidth = slideshow.clientWidth;
      slides.forEach(slide => {
        slide.style.minWidth = `${slideWidth}px`;
        slide.style.maxWidth = `${slideWidth}px`;
      });
      track.style.width = `${slideWidth * slides.length}px`;
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
})();

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

      // STOPS HERE //

}
            });
        }

  slideshow.addEventListener("touchend", () => {
    startX = null;
  });



