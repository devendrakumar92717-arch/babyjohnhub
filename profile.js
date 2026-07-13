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
