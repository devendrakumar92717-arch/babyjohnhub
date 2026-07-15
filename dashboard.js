/* ==========================================
   BabyJohnHub Dashboard JS
   Large Part 1A
========================================== */

const DashboardManager = {

    init(){

        this.loadProfile();

        this.loadStatistics();

        this.loadPremiumStatus();

        this.bindEvents();

        console.log("Dashboard Loaded");

    },

    loadProfile(){

        const user = JSON.parse(

            localStorage.getItem("bjh_user")

        ) || {};

        const name = document.getElementById("dashboardUserName");

        const email = document.getElementById("dashboardUserEmail");

        const photo = document.getElementById("dashboardUserPhoto");

        if(name){

            name.textContent = user.name || "Guest User";

        }

        if(email){

            email.textContent = user.email || "guest@babyjohnhub.com";

        }

        if(photo && user.photo){

            photo.src = user.photo;

        }

    },

    loadStatistics(){

        const watchlist = JSON.parse(

            localStorage.getItem("watchlist")

        ) || [];

        const downloads = JSON.parse(

            localStorage.getItem("downloads")

        ) || [];

        const history = JSON.parse(

            localStorage.getItem("history")

        ) || [];

        document.getElementById("watchlistCount").textContent = watchlist.length;

        document.getElementById("downloadCount").textContent = downloads.length;

        document.getElementById("historyCount").textContent = history.length;

        document.getElementById("continueWatchingCount").textContent = history.length;

    },

    loadPremiumStatus(){

        const premium = localStorage.getItem(

            "premium"

        );

        const status = document.getElementById(

            "premiumStatus"

        );

        if(status){

            status.textContent = premium === "true"

                ? "Premium"

                : "Free";

        }

    },

    bindEvents(){

        const profileBtn = document.getElementById(

            "dashboardProfileBtn"

        );

        if(profileBtn){

            profileBtn.addEventListener(

                "click",

                ()=>{

                    console.log("Open Profile");

                }

            );

        }

    }

};

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        DashboardManager.init();

    }

);
/* ==========================================
   BabyJohnHub Dashboard JS
   Large Part 1B
========================================== */

// ===============================
// Settings Button
// ===============================

DashboardManager.openSettings = function(){

    console.log("Opening Settings");

    if(typeof showSection === "function"){

        showSection("settingsSection");

    }

};

// ===============================
// Premium Button
// ===============================

DashboardManager.openPremium = function(){

    console.log("Opening Premium");

    if(typeof showSection === "function"){

        showSection("premiumSection");

    }

};

// ===============================
// Notification Status
// ===============================

DashboardManager.loadNotificationStatus = function(){

    const status = document.getElementById(
        "notificationStatus"
    );

    if(!status) return;

    const settings = JSON.parse(
        localStorage.getItem("bjh_settings")
    ) || {};

    status.textContent =
        settings.notification === false
        ? "Off"
        : "On";

};

// ===============================
// Continue Watching Progress
// ===============================

DashboardManager.loadContinueWatching = function(){

    const history = JSON.parse(
        localStorage.getItem("history")
    ) || [];

    console.log(
        "Continue Watching:",
        history.length
    );

};

// ===============================
// Refresh Dashboard
// ===============================

DashboardManager.refresh = function(){

    this.loadProfile();

    this.loadStatistics();

    this.loadPremiumStatus();

    this.loadNotificationStatus();

    this.loadContinueWatching();

};

// ===============================
// Button Events
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        const settingsBtn =
        document.getElementById(
            "dashboardSettingsBtn"
        );

        if(settingsBtn){

            settingsBtn.addEventListener(
                "click",
                ()=>{

                    DashboardManager.openSettings();

                }
            );

        }

        const premiumBtn =
        document.getElementById(
            "dashboardPremiumBtn"
        );

        if(premiumBtn){

            premiumBtn.addEventListener(
                "click",
                ()=>{

                    DashboardManager.openPremium();

                }
            );

        }

        DashboardManager.loadNotificationStatus();

    }

);
