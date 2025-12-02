console.log("reviews.js loaded!");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready");

    loadReviews();

    const form = document.getElementById("reviewForm");
    const successBox = document.getElementById("successMessage");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const data = new FormData(form);

        try {
            const response = await fetch("submit_review.php", {
                method: "POST",
                body: data
            });

            const result = await response.json();
            console.log("Server response:", result);

            if (result.status === "ok") {
                successBox.textContent = result.message;
                successBox.style.display = "block";

                form.reset();
                loadReviews();

                setTimeout(() => {
                    successBox.style.display = "none";
                }, 4000);

            } else {
                alert(result.message);
            }

        } catch (err) {
            console.error("Fetch error:", err);
            alert("Server connection error.");
        }
    });
});

async function loadReviews() {
    console.log("Loading reviews...");
    const list = document.getElementById("reviewsList");
    list.innerHTML = "";

    try {
        const response = await fetch("load_reviews.php");
        const reviews = await response.json();

        console.log("Loaded reviews:", reviews);

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
        console.error("Reviews loading failed", err);
    }
}
