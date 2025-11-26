const fields = [
    {
        input: document.getElementById("email"),
        message: document.getElementById("emailMessage"),
        error: document.getElementById("emailError"),
        validate: validateEmail,
        emptyMsg: "Enter your email address",
        invalidMsg: "Please enter a valid email address"
    },
    {
        input: document.getElementById("username"),
        message: document.getElementById("usernameMessage"),
        error: document.getElementById("usernameError"),
        validate: validateUsername,
        emptyMsg: "Enter username",
        invalidMsg: "Username must contain letters and numbers and be at least 4 characters long"
    },
    {
        input: document.getElementById("password"),
        message: document.getElementById("passwordMessage"),
        error: document.getElementById("passwordError"),
        validate: validatePassword,
        emptyMsg: "Enter password",
        invalidMsg: "The password must contain letters and numbers and be at least 6 characters long."
    },
    {
        input: document.getElementById("fname"),
        message: document.getElementById("fnameMessage"),
        error: document.getElementById("fnameError"),
        validate: validateFname,
        emptyMsg: "Enter your name",
        invalidMsg: "The name must contain only letters (2-20 characters)"
    },
    {
        input: document.getElementById("lname"),
        message: document.getElementById("lnameMessage"),
        error: document.getElementById("lnameError"),
        validate: validateLname,
        emptyMsg: "Enter your last name",
        invalidMsg: "The last name must contain only letters (2-20 characters)"
    }
];


fields.forEach(field => {
    const { input, message, error, validate, emptyMsg, invalidMsg } = field;

    input.addEventListener("focus", () => {
        message.style.display = "block";
        error.style.display = "none";
    });

    input.addEventListener("blur", () => {
        const value = input.value.trim();
        message.style.display = "none";

        if (value === "") {
            error.textContent = emptyMsg;
            error.style.display = "block";
        } else if (!validate(value)) {
            error.textContent = invalidMsg;
            error.style.display = "block";
        } else {
            error.style.display = "none";
        }
    });
});

// Проверка всех полей при отправке
document.addEventListener("DOMContentLoaded",()=>{
    const form = document.querySelector(".signup-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;

    fields.forEach(field => {
        const { input, error, validate, emptyMsg, invalidMsg } = field;
        const value = input.value.trim();

        if (value === "") {
            error.textContent = emptyMsg;
            error.style.display = "block";
            isValid = false;
        } else if (!validate(value)) {
            error.textContent = invalidMsg;
            error.style.display = "block";
            isValid = false;
        } else {
            error.style.display = "none";
        }
    });

        if (isValid) {
            alert("The form has been successfully submitted!");
            form.submit();
        }
    })
});


function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function validateUsername(username) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(username);
}

function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
}

function validateFname(fname) {
    return /^[a-zA-Zа-яА-ЯёЁ]{2,20}$/.test(fname);
}

function validateLname(lname) {
    return /^[a-zA-Zа-яА-ЯёЁ]{2,20}$/.test(lname);
}








