document.addEventListener("DOMContentLoaded", () => {
loadReviews();


const form = document.getElementById("reviewForm");
const success = document.getElementById("successMessage");


form.addEventListener("submit", async (e) => {
e.preventDefault();


const data = new FormData(form);


const req = await fetch("submit_review.php", {
method: "POST",
body: data
});


const res = await req.text();
console.log(res);


success.style.display = "block";
setTimeout(() => success.style.display = "none", 4000);


form.reset();
loadReviews();
});
});


async function loadReviews() {
const list = document.getElementById("reviewsList");
list.innerHTML = "";


const req = await fetch("load_reviews.php");
const reviews = await req.json();


reviews.forEach(r => {
const div = document.createElement("div");
div.className = "review-card";
div.innerHTML = `
<div class="review-name">${r.name}</div>
<div class="review-rating">${"★".repeat(r.rating)}</div>
<div class="review-message">${r.message}</div>
`;
list.appendChild(div);
});
}