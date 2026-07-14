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
