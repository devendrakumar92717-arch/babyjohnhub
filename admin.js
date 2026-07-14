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

/* ======================================
   BabyJohnHub OTT
   Admin Panel
   Part 2/6
====================================== */

// Get All Users

function getAllUsers() {

    return JSON.parse(
        localStorage.getItem("bjh_users")
    ) || [];

}

// Save Users

function saveAllUsers(users) {

    localStorage.setItem(
        "bjh_users",
        JSON.stringify(users)
    );

}

// Make Admin

function makeAdmin(userId) {

    let users = getAllUsers();

    users = users.map(user => {

        if (user.id === userId) {

            user.role = "Admin";

        }

        return user;

    });

    saveAllUsers(users);

    console.log("Admin Added");

}

// Remove Admin

function removeAdmin(userId) {

    let users = getAllUsers();

    users = users.map(user => {

        if (user.id === userId) {

            user.role = "User";

        }

        return user;

    });

    saveAllUsers(users);

    console.log("Admin Removed");

}

console.log("Admin Part 2 Ready");

/* ======================================
   BabyJohnHub OTT
   Admin Panel
   Part 3/6
====================================== */

// Block User

function blockUser(userId) {

    let users = getAllUsers();

    users = users.map(user => {

        if (user.id === userId) {

            user.blocked = true;

        }

        return user;

    });

    saveAllUsers(users);

    console.log("User Blocked");

}

// Unblock User

function unblockUser(userId) {

    let users = getAllUsers();

    users = users.map(user => {

        if (user.id === userId) {

            user.blocked = false;

        }

        return user;

    });

    saveAllUsers(users);

    console.log("User Unblocked");

}

// Search User

function searchUsers(keyword) {

    const users = getAllUsers();

    return users.filter(user =>

        (user.username || "").toLowerCase().includes(keyword.toLowerCase()) ||

        (user.email || "").toLowerCase().includes(keyword.toLowerCase())

    );

}

// User Statistics

function getUserStats() {

    const users = getAllUsers();

    return {

        totalUsers: users.length,

        admins: users.filter(u => u.role === "Admin").length,

        blockedUsers: users.filter(u => u.blocked).length,

        premiumUsers: users.filter(u => u.premium).length

    };

}

console.log("Admin Part 3 Ready");
