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

/* ==========================================
   BabyJohnHub Dashboard JS
   Large Part 2A
========================================== */

// ===============================
// Recent Activity
// ===============================

DashboardManager.loadRecentActivity = function(){

    const history = JSON.parse(

        localStorage.getItem("history")

    ) || [];

    console.log(

        "Recent Activity:",

        history

    );

};

// ===============================
// Membership Status
// ===============================

DashboardManager.loadMembership = function(){

    const membership = localStorage.getItem(

        "membership"

    ) || "Free";

    console.log(

        "Membership:",

        membership

    );

};

// ===============================
// Watch Time
// ===============================

DashboardManager.calculateWatchTime = function(){

    const watchTime = Number(

        localStorage.getItem("watch_time")

    ) || 0;

    console.log(

        "Total Watch Time:",

        watchTime,

        "Minutes"

    );

};

// ===============================
// Last Login
// ===============================

DashboardManager.loadLastLogin = function(){

    const lastLogin = localStorage.getItem(

        "last_login"

    ) || "Today";

    console.log(

        "Last Login:",

        lastLogin

    );

};

// ===============================
// Dashboard Summary
// ===============================

DashboardManager.updateSummary = function(){

    this.loadStatistics();

    this.loadNotificationStatus();

    this.loadMembership();

    this.calculateWatchTime();

    this.loadLastLogin();

    this.loadRecentActivity();

};

// ===============================
// Auto Refresh Dashboard
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        DashboardManager.updateSummary();

    }

);
/* ==========================================
   BabyJohnHub Dashboard JS
   Large Part 2B
========================================== */

// ===============================
// Edit Profile
// ===============================

DashboardManager.editProfile = function(){

    console.log("Edit Profile");

};

// ===============================
// Refresh Watchlist
// ===============================

DashboardManager.refreshWatchlist = function(){

    const watchlist = JSON.parse(

        localStorage.getItem("watchlist")

    ) || [];

    const count = document.getElementById(

        "watchlistCount"

    );

    if(count){

        count.textContent = watchlist.length;

    }

};

// ===============================
// Refresh Downloads
// ===============================

DashboardManager.refreshDownloads = function(){

    const downloads = JSON.parse(

        localStorage.getItem("downloads")

    ) || [];

    const count = document.getElementById(

        "downloadCount"

    );

    if(count){

        count.textContent = downloads.length;

    }

};

// ===============================
// Refresh Continue Watching
// ===============================

DashboardManager.refreshContinueWatching = function(){

    const history = JSON.parse(

        localStorage.getItem("history")

    ) || [];

    const count = document.getElementById(

        "continueWatchingCount"

    );

    if(count){

        count.textContent = history.length;

    }

};

// ===============================
// Save Dashboard
// ===============================

DashboardManager.saveDashboard = function(){

    const dashboard = {

        updated:new Date().toISOString()

    };

    localStorage.setItem(

        "bjh_dashboard",

        JSON.stringify(dashboard)

    );

};

// ===============================
// Live Update
// ===============================

DashboardManager.liveUpdate = function(){

    this.refreshWatchlist();

    this.refreshDownloads();

    this.refreshContinueWatching();

    this.saveDashboard();

};

// ===============================
// Auto Refresh Every 30 Seconds
// ===============================

setInterval(

    ()=>{

        DashboardManager.liveUpdate();

    },

    30000

);

// ===============================
// Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        DashboardManager.liveUpdate();

    }

);

/* ==========================================
   BabyJohnHub Dashboard JS
   Large Part 3A
========================================== */

// ===============================
// Dashboard Analytics
// ===============================

DashboardManager.loadAnalytics = function(){

    const history = JSON.parse(

        localStorage.getItem("history")

    ) || [];

    const watchlist = JSON.parse(

        localStorage.getItem("watchlist")

    ) || [];

    const downloads = JSON.parse(

        localStorage.getItem("downloads")

    ) || [];

    const analytics = {

        watched : history.length,

        watchlist : watchlist.length,

        downloads : downloads.length

    };

    console.table(analytics);

};

// ===============================
// Total Watch Time
// ===============================

DashboardManager.totalWatchTime = function(){

    const watchTime = Number(

        localStorage.getItem("watch_time")

    ) || 0;

    console.log(

        "Watch Time :",

        watchTime,

        "Minutes"

    );

};

// ===============================
// Achievement System
// ===============================

DashboardManager.loadAchievements = function(){

    const history = JSON.parse(

        localStorage.getItem("history")

    ) || [];

    let badge = "Beginner";

    if(history.length >= 20){

        badge = "Movie Lover";

    }

    if(history.length >= 50){

        badge = "Super Viewer";

    }

    if(history.length >= 100){

        badge = "Legend";

    }

    console.log(

        "Achievement :",

        badge

    );

};

// ===============================
// Premium Information
// ===============================

DashboardManager.loadPremiumInfo = function(){

    const premium = localStorage.getItem(

        "premium"

    ) === "true";

    console.log(

        premium

        ? "Premium User"

        : "Free User"

    );

};

// ===============================
// User Summary
// ===============================

DashboardManager.userSummary = function(){

    this.loadAnalytics();

    this.totalWatchTime();

    this.loadAchievements();

    this.loadPremiumInfo();

};

// ===============================
// Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        DashboardManager.userSummary();

    }

);
