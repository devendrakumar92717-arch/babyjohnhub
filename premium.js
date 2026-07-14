/* ======================================
   BabyJohnHub OTT
   Premium System
   Part 1/6
====================================== */

// Premium Plans

const premiumPlans = {

    monthly: {
        id: "monthly",
        name: "Monthly",
        duration: 30
    },

    threeMonths: {
        id: "threeMonths",
        name: "3 Months",
        duration: 90
    },

    sixMonths: {
        id: "sixMonths",
        name: "6 Months",
        duration: 180
    },

    oneYear: {
        id: "oneYear",
        name: "1 Year",
        duration: 365
    }

};

// Selected Plan

let selectedPlan = null;

// Select Plan

function selectPremiumPlan(planId) {

    if (!premiumPlans[planId]) return;

    selectedPlan = premiumPlans[planId];

    console.log("Selected Plan:", selectedPlan.name);

}

// Get Selected Plan

function getSelectedPlan() {

    return selectedPlan;

}

console.log("Premium Part 1 Ready");

/* ======================================
   BabyJohnHub OTT
   Premium System
   Part 2/6
====================================== */

// Save Premium

function savePremium(plan) {

    const startDate = new Date();

    const expiryDate = new Date();

    expiryDate.setDate(
        startDate.getDate() + plan.duration
    );

    const premiumData = {

        active: true,

        plan: plan.id,

        planName: plan.name,

        startDate: startDate.toISOString(),

        expiryDate: expiryDate.toISOString()

    };

    localStorage.setItem(
        "bjh_premium",
        JSON.stringify(premiumData)
    );

}

// Get Premium

function getPremium() {

    return JSON.parse(
        localStorage.getItem("bjh_premium")
    );

}

// Check Premium

function isPremiumActive() {

    const premium = getPremium();

    if (!premium) return false;

    return new Date() <
        new Date(premium.expiryDate);

}

console.log("Premium Part 2 Ready");

/* ======================================
   BabyJohnHub OTT
   Premium System
   Part 3/6
====================================== */

// Ads Status

function shouldShowAds() {

    return !isPremiumActive();

}

// Apply Ads

function updateAds() {

    const ads = document.querySelectorAll(".ad-container");

    ads.forEach(function(ad) {

        if (shouldShowAds()) {

            ad.style.display = "block";

        } else {

            ad.style.display = "none";

        }

    });

}

// Get User Type

function getUserType() {

    const user = localStorage.getItem("bjh_user");

    if (!user) {

        return "Guest";

    }

    if (isPremiumActive()) {

        return "Premium";

    }

    return "Registered";

}

// Run On Website Load

window.addEventListener("load", function() {

    updateAds();

    console.log("User Type:", getUserType());

});

/* ======================================
   BabyJohnHub OTT
   Premium System
   Part 4/6
====================================== */

// Selected Payment Method

let selectedPaymentMethod = null;

// Select Payment Method

function selectPaymentMethod(method) {

    selectedPaymentMethod = method;

    console.log("Payment Method:", method);

}

// Get Selected Payment Method

function getSelectedPaymentMethod() {

    return selectedPaymentMethod;

}

// Start Payment (Demo)

function startPremiumPayment() {

    if (!selectedPlan) {

        alert("Please select a Premium Plan.");

        return;

    }

    if (!selectedPaymentMethod) {

        alert("Please select a Payment Method.");

        return;

    }

    console.log("Starting Payment...");

    console.log("Plan:", selectedPlan.name);

    console.log("Payment:", selectedPaymentMethod);

    alert("Redirecting to Payment...");

}
