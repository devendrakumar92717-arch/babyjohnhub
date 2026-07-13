/* ======================================
   BabyJohnHub OTT
   Profile System
   Part 1/5
====================================== */

// Current Profile
let userProfile = null;

// Load Profile
function loadProfile() {

    const savedProfile =
        localStorage.getItem("bjh_profile");

    if (!savedProfile) {

        console.log("Guest User");

        return;

    }

    userProfile = JSON.parse(savedProfile);

    updateProfileUI();

}

// Update Profile UI
function updateProfileUI() {

    const username =
        document.getElementById("profileUsername");

    const userId =
        document.getElementById("profileUserId");

    const membership =
        document.getElementById("profileMembership");

    if (username)
        username.innerText = userProfile.username;

    if (userId)
        userId.innerText = userProfile.userId;

    if (membership)
        membership.innerText = userProfile.membership;

}

// Edit Username
function editUsername(newName) {

    if (!userProfile) return;

    userProfile.username = newName;

    localStorage.setItem(
        "bjh_profile",
        JSON.stringify(userProfile)
    );

    updateProfileUI();

}

window.addEventListener("load", loadProfile);

console.log("Profile Part 1 Ready");

/* ======================================
   BabyJohnHub OTT
   Profile System
   Part 2/5
====================================== */

// Get Favorites

function getFavorites() {

    return JSON.parse(
        localStorage.getItem("bjh_favorites")
    ) || [];

}

// Save Favorites

function saveFavorites(favorites) {

    localStorage.setItem(
        "bjh_favorites",
        JSON.stringify(favorites)
    );

}

// Add Favorite

function addFavorite(movieId) {

    let favorites = getFavorites();

    if (!favorites.includes(movieId)) {

        favorites.push(movieId);

        saveFavorites(favorites);

    }

}

// Remove Favorite

function removeFavorite(movieId) {

    let favorites = getFavorites();

    favorites = favorites.filter(
        id => id !== movieId
    );

    saveFavorites(favorites);

}

// Check Favorite

function isFavorite(movieId) {

    return getFavorites().includes(movieId);

}

// Toggle Favorite

function toggleFavorite(movieId) {

    if (isFavorite(movieId)) {

        removeFavorite(movieId);

        alert("💔 Removed from Favorites");

    } else {

        addFavorite(movieId);

        alert("❤️ Added to Favorites");

    }

}

console.log("Profile Part 2 Ready");

/* ======================================
   BabyJohnHub OTT
   Profile System
   Part 3/5
====================================== */

// Save Continue Watching

function saveContinueWatching(videoId, currentTime, duration) {

    let watching = JSON.parse(
        localStorage.getItem("bjh_continue")
    ) || {};

    watching[videoId] = {

        currentTime: currentTime,

        duration: duration,

        updatedAt: Date.now()

    };

    localStorage.setItem(
        "bjh_continue",
        JSON.stringify(watching)
    );

}

// Get Continue Watching

function getContinueWatching() {

    return JSON.parse(
        localStorage.getItem("bjh_continue")
    ) || {};

}

// Get Progress %

function getWatchProgress(videoId) {

    const watching = getContinueWatching();

    if (!watching[videoId]) return 0;

    return Math.floor(

        (watching[videoId].currentTime /

        watching[videoId].duration) * 100

    );

}

// Remove Continue Watching

function removeContinueWatching(videoId) {

    let watching = getContinueWatching();

    delete watching[videoId];

    localStorage.setItem(

        "bjh_continue",

        JSON.stringify(watching)

    );

}

console.log("Profile Part 3 Ready");
