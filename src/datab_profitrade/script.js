const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
});

document.getElementById("loginButton").addEventListener("click", function () {
    window.location.href = "login.php";
});

document.getElementById("signupButton").addEventListener("click", function () {
    window.location.href = "signup.php";
});