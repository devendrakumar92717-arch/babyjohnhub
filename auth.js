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

/* ======================================
   BabyJohnHub OTT
   Authentication System
   Part 3/6
====================================== */

let otpTimer = 60;
let otpInterval = null;

// Start OTP Timer

function startOtpTimer() {

    const timer = document.getElementById("otpTimer");

    otpTimer = 60;

    clearInterval(otpInterval);

    otpInterval = setInterval(function () {

        if (timer) {

            timer.innerHTML =
                "Resend OTP in " + otpTimer + " sec";

        }

        otpTimer--;

        if (otpTimer < 0) {

            clearInterval(otpInterval);

            if (timer) {

                timer.innerHTML =
                    "Resend OTP";

            }

        }

    }, 1000);

}

// Send OTP (Demo)

function sendOTP() {

    alert("OTP Sent Successfully");

    startOtpTimer();

}

// Verify OTP (Demo)

function verifyOTP() {

    const otp =
        document.getElementById("otpInput");

    if (!otp) return;

    if (otp.value.length === 6) {

        alert("OTP Verified Successfully");

    } else {

        alert("Please Enter Valid 6 Digit OTP");

    }

}

// Resend OTP

function resendOTP() {

    if (otpTimer <= 0) {

        sendOTP();

    }

}

console.log("Authentication Part 3 Ready");

/* ======================================
   BabyJohnHub OTT
   Authentication System
   Part 4/6
====================================== */

// Current User

let currentUser = null;

// Login

function loginUser(userData) {

    currentUser = userData;

    localStorage.setItem(
        "bjh_user",
        JSON.stringify(userData)
    );

    alert("✅ Login Successful");

    closeAuth();

}

// Logout

function logoutUser() {

    localStorage.removeItem("bjh_user");

    currentUser = null;

    alert("👋 Logged Out Successfully");

}

// Auto Login

function checkLogin() {

    const savedUser =
        localStorage.getItem("bjh_user");

    if (savedUser) {

        currentUser =
            JSON.parse(savedUser);

        console.log(
            "Welcome Back:",
            currentUser.username
        );

    }

}

// Remember Login

window.addEventListener("load", function () {

    checkLogin();

});

console.log("Authentication Part 4 Ready");
