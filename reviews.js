// reviews.js
document.addEventListener("DOMContentLoaded", () => {
    loadReviews();

    const form = document.getElementById("reviewForm");
    const successBox = document.getElementById("successMessage");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("PHP/Luna-Project/submit_review.php", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log(data);

            if (data.status === "ok") {
                // показываем сообщение
                successBox.textContent = data.message || "Thanks you for your review!";
                successBox.style.display = "block";

                // очищаем форму
                form.reset();

                // обновляем список отзывов
                loadReviews();

                // прячем сообщение через пару секунд
                setTimeout(() => {
                    successBox.style.display = "none";
                }, 4000);
            } else {
                alert(data.message || "There was an error sending your review..");
            }
        } catch (err) {
            console.error(err);
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

        if (!Array.isArray(reviews)) return;

        reviews.forEach(r => {
            const card = document.createElement("div");
            card.className = "review-card";

            card.innerHTML = `
                <div class="review-name">${r.name}</div>
                <div class="review-rating">${"★".repeat(r.rating)}</div>
                <div class="review-message">${r.message}</div>
            `;

            list.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading reviews:", err);
    }
}
