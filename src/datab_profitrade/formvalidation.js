// let emailInput = document.getElementById("email");
// let emailMessage = document.getElementById("emailMessage");
// let emailError = document.getElementById("emailError");

// let usernameInput = document.getElementById("username");
// let usernameMessage = document.getElementById("usernameMessage");
// let usernameError = document.getElementById("usernameError");

// let passwordInput = document.getElementById("password");
// let passwordMessage = document.getElementById("passwordMessage");
// let passwordError = document.getElementById("passwordError");

// emailInput.addEventListener("focus", () => {
//     emailMessage.style.display = "block"; 
//     emailError.style.display = "none"; 
// });

// usernameInput.addEventListener("focus", () => {
//     usernameMessage.style.display = "block"; 
//     usernameError.style.display = "none"; 
// });

// passwordInput.addEventListener("focus", () => {
//     passwordMessage.style.display = "block"; 
//     passwordError.style.display = "none"; 
// });

// emailInput.addEventListener("blur", () => {
//     let email = emailInput.value.trim();
//     emailMessage.style.display = "none"; 

//     if (email === "") {
//         emailError.textContent = "Enter your email";
//         emailError.style.display = "block";
//     } else if (!validateEmail(email)) {
//         emailError.textContent = "Please enter a valid email address";
//         emailError.style.display = "block";
//     } else {
//         emailError.style.display = "none"; 
//     }
// });

// usernameInput.addEventListener("blur", () => {
//     let username = usernameInput.value.trim();
//     usernameMessage.style.display = "none"; 

//     if (username === "") {
//         usernameError.textContent = "Please enter your username";
//         usernameError.style.display = "block";
//     } else if (!validateUsername(username)) {
//         usernameError.textContent = "Please enter a valid username";
//         usernameError.style.display = "block";
//     } else {
//         usernameError.style.display = "none"; 
//     }
// });

// passwordInput.addEventListener("blur", () => {
//     let password = passwordInput.value.trim();
//     passwordMessage.style.display = "none"; 

//     if (password === "") {
//         passwordError.textContent = "Please enter your password";
//         passwordError.style.display = "block";
//     } else if (!validatePassword(password)) {
//         passwordError.textContent = "Please enter a valid password";
//         passwordError.style.display = "block";
//     } else {
//         passwordError.style.display = "none"; 
//     }
// });


// document.getElementById("submit").addEventListener("click", (e) => {
//     e.preventDefault();
//         let email = emailInput.value.trim();
//         let username = usernameInput.value.trim();
//         let password = passwordInput.value.trim();
   
//     let isValid = true;

//     let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     let usernamePattern =/^[a-zA-Z0-9-._]{2,20}$/;
//     let passwordPattern=/^[a-zA-Z0-9]{4,6}$/;

//     let emailMatch = emailPattern.test(email);
//          let usernameMatch = usernamePattern.test(username)
//       let passwordMatch = passwordPattern.test(password)
//       console.log(emailMatch)
//       console.log(usernameMatch)
//       console.log(passwordMatch)

//     if (!emailMatch) {
//         emailError.innerHTML = "Please enter a valid email address";
//         emailError.style.visibility = "visible";
//         isValid = false;
//     } else {
//         emailError.style.visibility = "hidden";
//     }

//     if (!usernameMatch) {
//         usernameError.innerHTML = "Please enter a valid username1";
//         usernameError.style.visibility = "visible";
//         isValid = false;
//     } else {
//         usernameError.style.visibility = "hidden";
//     }

//     if (!passwordMatch) {
//         passwordError.innerHTML = "Please enter a valid password1";
//         passwordError.style.visibility = "visible";
//         isValid = false;
//     } else {
//         passwordError.style.visibility = "hidden";
//     }

//     if (isValid) {
//         alert("Form successfully submitted!");
//     }
//     console.log("email:", email);
//     console.log(emailMatch);
//     console.log(emailPattern);
//     console.log(isValid);

//     console.log("username:", username);
//     console.log(usernameMatch);
//     console.log(usernamePattern);
//     console.log(isValid);

//     console.log("password:", password);
//     console.log(passwordMatch);
//     console.log(passwordPattern);
//     console.log(isValid);
// });

// function validateEmail(email) {
//     let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailPattern.test(email);
// }

// function validateUsername(username) {
//     let usernamePattern = /^[a-zA-Z0-9-._]{2,20}$/;
//     return usernamePattern.test(username);
// }

// function validatePassword(password) {
//     let passwordPattern = /^[a-zA-Z0-9]{4,6}$/;
//     return passwordPattern.test(password);
// }

