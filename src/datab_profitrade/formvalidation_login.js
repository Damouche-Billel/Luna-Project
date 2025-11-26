let emailInput = document.getElementById("email");
let emailMessage = document.getElementById("emailMessage");
let emailError = document.getElementById("emailError");

let passwordInput = document.getElementById("password");
let passwordMessage = document.getElementById("passwordMessage");
let passwordError = document.getElementById("passwordError");

emailInput.addEventListener("focus", () => {
    emailMessage.style.display = "block"; 
    emailError.style.display = "none"; 
});

passwordInput.addEventListener("focus", () => {
    passwordMessage.style.display = "block"; 
    passwordError.style.display = "none"; 
});

emailInput.addEventListener("blur", () => {
    let email = emailInput.value.trim();
    emailMessage.style.display = "none"; 

    if (email === "") {
        emailError.textContent = "Enter your email";
        emailError.style.display = "block";
    } else if (!validateEmail(email)) {
        emailError.textContent = "Please enter a valid email address";
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none"; 
    }
});


passwordInput.addEventListener("blur", () => {
    let password = passwordInput.value.trim();
    passwordMessage.style.display = "none"; 

    if (password === "") {
        passwordError.textContent = "Please enter your password";
        passwordError.style.display = "block";
    } else if (!validatePassword(password)) {
        passwordError.textContent = "Please enter a valid password";
        passwordError.style.display = "block";
    } else {
        passwordError.style.display = "none"; 
    }
});


document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
        let email = emailInput.value.trim();
             let password = passwordInput.value.trim();
    // let email = document.getElementById('email').value.trim();
    // let emailError = document.getElementById("emailError");
    let isValid = true;

    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let passwordPattern=/^[a-zA-Z0-9]{4,6}$/;

    let emailMatch = emailPattern.test(email);
             let passwordMatch = passwordPattern.test(password)
      console.log(emailMatch)
         console.log(passwordMatch)

    if (!emailMatch) {
        emailError.innerHTML = "Please enter a valid email address";
        emailError.style.visibility = "visible";
        isValid = false;
    } else {
        emailError.style.visibility = "hidden";
    }

   
    if (!passwordMatch) {
        passwordError.innerHTML = "Please enter a valid password1";
        passwordError.style.visibility = "visible";
        isValid = false;
    } else {
        passwordError.style.visibility = "hidden";
    }

    if (isValid) {
        alert("Form successfully submitted!");
    }
    console.log("email:", email);
    console.log(emailMatch);
    console.log(emailPattern);
    console.log(isValid);

    console.log("password:", password);
    console.log(passwordMatch);
    console.log(passwordPattern);
    console.log(isValid);
});

function validateEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}


function validatePassword(password) {
    let passwordPattern = /^[a-zA-Z0-9]{4,6}$/;
    return passwordPattern.test(password);
}

