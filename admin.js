/* ======================================
   BabyJohnHub OTT
   Admin Panel
   Part 1/6
====================================== */

// Default Super Admin

const SUPER_ADMIN = {

    id: "BJH-0001",

    username: "Devendra",

    role: "Super Admin"

};

// Current Admin

let currentAdmin = null;

// Login Admin

function adminLogin() {

    currentAdmin = SUPER_ADMIN;

    localStorage.setItem(
        "bjh_admin",
        JSON.stringify(currentAdmin)
    );

    console.log("Super Admin Logged In");

}

// Logout Admin

function adminLogout() {

    localStorage.removeItem("bjh_admin");

    currentAdmin = null;

    console.log("Admin Logged Out");

}

// Get Admin

function getCurrentAdmin() {

    return JSON.parse(
        localStorage.getItem("bjh_admin")
    );

}

// Check Admin

function isAdminLoggedIn() {

    return getCurrentAdmin() !== null;

}

console.log("Admin Part 1 Ready");
