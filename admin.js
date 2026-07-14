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

/* ======================================
   BabyJohnHub OTT
   Admin Panel
   Part 4/6
====================================== */

// Get Movies

function getAllMovies() {

    return JSON.parse(
        localStorage.getItem("bjh_movies")
    ) || [];

}

// Save Movies

function saveAllMovies(movies) {

    localStorage.setItem(
        "bjh_movies",
        JSON.stringify(movies)
    );

}

// Add Movie

function addMovie(movie) {

    const movies = getAllMovies();

    movies.push(movie);

    saveAllMovies(movies);

    console.log("Movie Added");

}

// Edit Movie

function editMovie(movieId, updatedMovie) {

    let movies = getAllMovies();

    movies = movies.map(movie =>

        movie.id === movieId
            ? { ...movie, ...updatedMovie }
            : movie

    );

    saveAllMovies(movies);

    console.log("Movie Updated");

}

// Delete Movie

function deleteMovie(movieId) {

    const movies = getAllMovies().filter(
        movie => movie.id !== movieId
    );

    saveAllMovies(movies);

    console.log("Movie Deleted");

}

console.log("Admin Part 4 Ready");

/* ======================================
   BabyJohnHub OTT
   Admin Panel
   Part 5/6
====================================== */

// Get Episodes

function getAllEpisodes() {

    return JSON.parse(
        localStorage.getItem("bjh_episodes")
    ) || [];

}

// Save Episodes

function saveAllEpisodes(episodes) {

    localStorage.setItem(
        "bjh_episodes",
        JSON.stringify(episodes)
    );

}

// Add Episode

function addEpisode(episode) {

    const episodes = getAllEpisodes();

    episodes.push(episode);

    saveAllEpisodes(episodes);

    console.log("Episode Added");

}

// Edit Episode

function editEpisode(episodeId, updatedEpisode) {

    let episodes = getAllEpisodes();

    episodes = episodes.map(ep =>

        ep.id === episodeId
            ? { ...ep, ...updatedEpisode }
            : ep

    );

    saveAllEpisodes(episodes);

    console.log("Episode Updated");

}

// Delete Episode

function deleteEpisode(episodeId) {

    const episodes = getAllEpisodes().filter(
        ep => ep.id !== episodeId
    );

    saveAllEpisodes(episodes);

    console.log("Episode Deleted");

}

console.log("Admin Part 5 Ready");
