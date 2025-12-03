console.log("reviews.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();

    const form = document.getElementById("reviewForm");
    const successBox = document.getElementById("successMessage");

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
});

async function loadReviews() {
    const list = document.getElementById("reviewsList");
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
                <div class="review-name">${r.name}</div>
                <div class="review-rating">${"★".repeat(r.rating)}</div>
                <div class="review-message">${r.message}</div>
            `;

            list.appendChild(card);
        });

    } catch (err) {
        console.error("Reviews loading failed:", err);
    }
}
