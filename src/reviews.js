console.log("reviews.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();
    loadCarouselReviews();

    const form = document.getElementById("reviewForm");
    const successBox = document.getElementById("successMessage");

    if (form && successBox) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Form submitted");

            const formData = new FormData(form);

            try {
                const response = await fetch("submit_review.php", {
                    method: "POST",
                    body: formData
                });

                // читаем JSON с сервера
                const data = await response.json();
                console.log("Server response:", data);

                if (data.status === "ok") {
                    // показываем уведомление
                    successBox.style.display = "flex";   // сделать видимым (flex, т.к. мы так оформили)
                    // даём кадровую задержку, чтобы transition сработал
                    requestAnimationFrame(() => {
                        successBox.classList.add("visible");
                    });

                    // очищаем форму
                    form.reset();

                    // подгружаем обновлённый список отзывов
                    loadReviews();
                    loadCarouselReviews();

                    // через 5 секунд плавно прячем уведомление
                    setTimeout(() => {
                        successBox.classList.remove("visible");
                        setTimeout(() => {
                            successBox.style.display = "none";
                        }, 400); // время совпадает с transition в CSS
                    }, 5000);

                } else {
                    // если сервер вернул ошибку
                    alert(data.message || "Error while sending review.");
                }

            } catch (err) {
                console.error("Fetch error:", err);
                alert("Server connection error.");
            }
        });
    }
});

async function loadReviews() {
    const list = document.getElementById("reviewsList");
    if (!list) return;
    
    list.innerHTML = "";

    try {
        const response = await fetch("load_reviews.php");
        const reviews = await response.json();

        console.log("Loaded reviews:", reviews);

        if (!Array.isArray(reviews)) return;

        reviews.forEach(r => {
            const card = document.createElement("div");
            card.classList.add("review-card");

            card.innerHTML = `
                <div class="review-name">${escapeHtml(r.name)}</div>
                <div class="review-rating">${"★".repeat(r.rating)}</div>
                <div class="review-message">${escapeHtml(r.message)}</div>
            `;

            list.appendChild(card);
        });

    } catch (err) {
        console.error("Reviews loading failed:", err);
    }
}

// Load reviews for carousel
async function loadCarouselReviews() {
    const track = document.getElementById("reviewsTrack");
    const dotsContainer = document.getElementById("carouselDots");
    
    if (!track || !dotsContainer) return;

    try {
        const response = await fetch("load_reviews.php");
        const reviews = await response.json();

        if (!Array.isArray(reviews) || reviews.length === 0) return;

        track.innerHTML = "";
        dotsContainer.innerHTML = "";

        reviews.forEach((r, index) => {
            // Create slide
            const slide = document.createElement("div");
            slide.classList.add("review-slide");
            
            slide.innerHTML = `
                <div class="star-rating" aria-label="${r.rating} out of 5 stars">${"★".repeat(r.rating)}</div>
                <p class="review-quote">"${escapeHtml(r.message)}"</p>
                <cite class="review-author">— ${escapeHtml(r.name)}</cite>
            `;
            
            track.appendChild(slide);

            // Create dot
            const dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            if (index === 0) dot.classList.add("active");
            dot.setAttribute("aria-label", `Go to review ${index + 1}`);
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        initCarousel();

    } catch (err) {
        console.error("Carousel reviews loading failed:", err);
    }
}

// Carousel functionality
let currentSlide = 0;
let autoplayInterval;

function initCarousel() {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    
    startAutoplay();
}

function goToSlide(index) {
    const slides = document.querySelectorAll(".review-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    
    if (slides.length === 0) return;
    
    currentSlide = index;
    
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll(".review-slide");
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
    resetAutoplay();
}

function prevSlide() {
    const slides = document.querySelectorAll(".review-slide");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
    resetAutoplay();
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
