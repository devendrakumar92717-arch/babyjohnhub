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
