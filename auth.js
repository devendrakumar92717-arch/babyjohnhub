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
