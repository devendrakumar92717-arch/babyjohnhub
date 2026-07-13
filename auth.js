/* ======================================
   BabyJohnHub OTT
   Authentication System
   Part 1/6
====================================== */

// Current Auth Screen
let currentAuthScreen = "login";

// Open Login Popup
function openLogin() {

    const popup = document.getElementById("authPopup");

    if (popup) {

        popup.style.display = "flex";

        currentAuthScreen = "login";

    }

}

// Open Signup Popup
function openSignup() {

    const popup = document.getElementById("authPopup");

    if (popup) {

        popup.style.display = "flex";

        currentAuthScreen = "signup";

    }

}

// Close Popup
function closeAuth() {

    const popup = document.getElementById("authPopup");

    if (popup) {

        popup.style.display = "none";

    }

}

// Switch Login ↔ Signup
function switchAuth() {

    if (currentAuthScreen === "login") {

        openSignup();

    } else {

        openLogin();

    }

}

// Close when clicking outside
window.addEventListener("click", function (event) {

    const popup = document.getElementById("authPopup");

    if (popup && event.target === popup) {

        closeAuth();

    }

});

console.log("Authentication Part 1 Ready");

/* ======================================
   BabyJohnHub OTT
   Authentication System
   Part 2/6
====================================== */

// Validate Username
function validateUsername(username) {

    username = username.trim();

    if (username.length < 3) {

        alert("Username must be at least 3 characters.");

        return false;

    }

    return true;

}

// Validate Email

function validateEmail(email) {

    const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {

        alert("Please enter a valid email.");

        return false;

    }

    return true;

}

// Validate Phone

function validatePhone(phone) {

    const pattern =
    /^[6-9]\d{9}$/;

    if (!pattern.test(phone)) {

        alert("Please enter a valid 10-digit mobile number.");

        return false;

    }

    return true;

}

// Validate Password

function validatePassword(password) {

    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        return false;

    }

    return true;

}

// Registration Validation

function validateRegistration(data) {

    if (!validateUsername(data.username)) return false;

    if (data.email &&
        !validateEmail(data.email))
        return false;

    if (data.phone &&
        !validatePhone(data.phone))
        return false;

    if (!validatePassword(data.password))
        return false;

    return true;

}

console.log("Authentication Part 2 Ready");
