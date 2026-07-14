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
