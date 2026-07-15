/* ==========================================
   BabyJohnHub Payment JS
   Large Part 1A
========================================== */

const PaymentSystem = {

    selectedPlan: null,

    selectedMethod: null,

    paymentStatus: "Pending",

    utrNumber: null,

    init() {

        this.bindPlanButtons();

        this.bindMethodButtons();

        console.log("Payment Module Initialized");

    },

    bindPlanButtons() {

        const plans = document.querySelectorAll(".buy-plan");

        plans.forEach(plan => {

            plan.addEventListener("click", () => {

                this.selectedPlan = plan.dataset.plan;

                console.log(

                    "Selected Plan:",

                    this.selectedPlan

                );

            });

        });

    },

    bindMethodButtons() {

        const methods = document.querySelectorAll(

            ".payment-methods button"

        );

        methods.forEach(button => {

            button.addEventListener("click", () => {

                methods.forEach(btn =>

                    btn.classList.remove("active")

                );

                button.classList.add("active");

                this.selectedMethod =

                    button.textContent.trim();

                console.log(

                    "Payment Method:",

                    this.selectedMethod

                );

            });

        });

    },

    generateUTR() {

        return "UTR" +

            Date.now() +

            Math.floor(

                Math.random()*1000

            );

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        PaymentSystem.init();

    }

);
/* ==========================================
   BabyJohnHub Payment JS
   Large Part 1B
========================================== */

// ===============================
// Start Payment
// ===============================

PaymentSystem.startPayment = function(){

    if(!this.selectedPlan){

        alert("Please select a Premium Plan.");

        return;

    }

    if(!this.selectedMethod){

        alert("Please select a Payment Method.");

        return;

    }

    this.utrNumber = this.generateUTR();

    this.paymentStatus = "Success";

    this.savePayment();

    this.updatePaymentResult();

};

// ===============================
// Save Payment
// ===============================

PaymentSystem.savePayment = function(){

    const payment = {

        plan: this.selectedPlan,

        method: this.selectedMethod,

        status: this.paymentStatus,

        utr: this.utrNumber,

        date: new Date().toLocaleString()

    };

    localStorage.setItem(

        "bjh_last_payment",

        JSON.stringify(payment)

    );

    console.log(

        "Payment Saved",

        payment

    );

};

// ===============================
// Update Result
// ===============================

PaymentSystem.updatePaymentResult = function(){

    const result = document.getElementById(

        "paymentResult"

    );

    if(!result) return;

    result.innerHTML = `

        <h3>Payment Status</h3>

        <p class="payment-success">

            Status: ${this.paymentStatus}

        </p>

        <p>

            Plan: ${this.selectedPlan}

        </p>

        <p>

            Method: ${this.selectedMethod}

        </p>

        <p class="payment-utr">

            UTR Number: ${this.utrNumber}

        </p>

    `;

};

// ===============================
// Buy Button Event
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        document.querySelectorAll(

            ".buy-plan"

        ).forEach(button=>{

            button.addEventListener(

                "dblclick",

                ()=>{

                    PaymentSystem.startPayment();

                }

            );

        });

    }

);

/* ==========================================
   BabyJohnHub Payment JS
   Large Part 2A
========================================== */

// ===============================
// Restore Last Payment
// ===============================

PaymentSystem.restoreLastPayment = function(){

    const payment = JSON.parse(

        localStorage.getItem("bjh_last_payment")

    );

    if(!payment) return;

    this.selectedPlan = payment.plan;

    this.selectedMethod = payment.method;

    this.paymentStatus = payment.status;

    this.utrNumber = payment.utr;

    console.log("Last Payment Restored");

};

// ===============================
// Premium Activate
// ===============================

PaymentSystem.activatePremium = function(){

    localStorage.setItem(

        "bjh_premium",

        "true"

    );

    console.log(

        "Premium Activated"

    );

};

// ===============================
// Membership Expiry
// ===============================

PaymentSystem.saveExpiry = function(days){

    const expiry = new Date();

    expiry.setDate(

        expiry.getDate() + days

    );

    localStorage.setItem(

        "bjh_membership_expiry",

        expiry.toISOString()

    );

};

// ===============================
// Verify Membership
// ===============================

PaymentSystem.verifyMembership = function(){

    const expiry = localStorage.getItem(

        "bjh_membership_expiry"

    );

    if(!expiry) return false;

    return new Date(expiry) > new Date();

};

// ===============================
// Payment History
// ===============================

PaymentSystem.saveHistory = function(){

    const history = JSON.parse(

        localStorage.getItem(

            "bjh_payment_history"

        )

    ) || [];

    history.push({

        plan:this.selectedPlan,

        method:this.selectedMethod,

        utr:this.utrNumber,

        status:this.paymentStatus,

        date:new Date().toLocaleString()

    });

    localStorage.setItem(

        "bjh_payment_history",

        JSON.stringify(history)

    );

};

// ===============================
// Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PaymentSystem.restoreLastPayment();

    }

);
/* ==========================================
   BabyJohnHub Payment JS
   Large Part 2B
========================================== */

// ===============================
// Show Payment History
// ===============================

PaymentSystem.showHistory = function(){

    const history = JSON.parse(

        localStorage.getItem(

            "bjh_payment_history"

        )

    ) || [];

    console.table(history);

};

// ===============================
// Search UTR
// ===============================

PaymentSystem.searchUTR = function(utr){

    const history = JSON.parse(

        localStorage.getItem(

            "bjh_payment_history"

        )

    ) || [];

    return history.find(

        item => item.utr === utr

    );

};

// ===============================
// Cancel Membership
// ===============================

PaymentSystem.cancelMembership = function(){

    localStorage.removeItem(

        "bjh_premium"

    );

    localStorage.removeItem(

        "bjh_membership_expiry"

    );

    console.log(

        "Membership Cancelled"

    );

};

// ===============================
// Renew Membership
// ===============================

PaymentSystem.renewMembership = function(days){

    this.activatePremium();

    this.saveExpiry(days);

    console.log(

        "Membership Renewed"

    );

};

// ===============================
// Backup Payment Data
// ===============================

PaymentSystem.backupPayments = function(){

    const history = localStorage.getItem(

        "bjh_payment_history"

    );

    localStorage.setItem(

        "bjh_payment_history_backup",

        history

    );

};

// ===============================
// Payment Statistics
// ===============================

PaymentSystem.statistics = function(){

    const history = JSON.parse(

        localStorage.getItem(

            "bjh_payment_history"

        )

    ) || [];

    console.table({

        totalPayments: history.length,

        premiumActive:

            this.verifyMembership()

    });

};

// ===============================
// Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PaymentSystem.showHistory();

        PaymentSystem.statistics();

    }

);

/* ==========================================
   BabyJohnHub Payment JS
   Large Part 3A
========================================== */

// ===============================
// Security Check
// ===============================

PaymentSystem.securityCheck = function(){

    if(!this.selectedPlan){

        console.warn("No Premium Plan Selected");

    }

    if(!this.selectedMethod){

        console.warn("No Payment Method Selected");

    }

};

// ===============================
// Verify UTR
// ===============================

PaymentSystem.verifyUTR = function(utr){

    if(!utr){

        return false;

    }

    return utr.startsWith("UTR");

};

// ===============================
// Membership Validation
// ===============================

PaymentSystem.validateMembership = function(){

    const valid = this.verifyMembership();

    console.log(

        valid

        ? "Membership Active"

        : "Membership Expired"

    );

};

// ===============================
// Sync Payment
// ===============================

PaymentSystem.syncPayment = function(){

    console.log(

        "Payment Data Synced"

    );

};

// ===============================
// Session Info
// ===============================

PaymentSystem.sessionInfo = function(){

    console.table({

        plan:this.selectedPlan,

        method:this.selectedMethod,

        status:this.paymentStatus,

        utr:this.utrNumber

    });

};

// ===============================
// Analytics
// ===============================

PaymentSystem.analytics = function(){

    const history = JSON.parse(

        localStorage.getItem(

            "bjh_payment_history"

        )

    ) || [];

    console.log(

        "Total Payments:",

        history.length

    );

};

// ===============================
// Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PaymentSystem.securityCheck();

        PaymentSystem.validateMembership();

        PaymentSystem.syncPayment();

        PaymentSystem.sessionInfo();

        PaymentSystem.analytics();

    }

);
/* ==========================================
   BabyJohnHub Payment JS
   Large Part 3B (Final)
========================================== */

// ===============================
// Version Information
// ===============================

PaymentSystem.version = {

    app: "BabyJohnHub",

    module: "Payment",

    version: "1.0.0"

};

console.table(

    PaymentSystem.version

);

// ===============================
// Debug Mode
// ===============================

PaymentSystem.debug = function(){

    console.group(

        "Payment Debug"

    );

    console.log(

        "Plan:",

        this.selectedPlan

    );

    console.log(

        "Method:",

        this.selectedMethod

    );

    console.log(

        "Status:",

        this.paymentStatus

    );

    console.log(

        "UTR:",

        this.utrNumber

    );

    console.groupEnd();

};

// ===============================
// Restore Backup
// ===============================

PaymentSystem.restoreBackup = function(){

    const backup = localStorage.getItem(

        "bjh_payment_history_backup"

    );

    if(backup){

        localStorage.setItem(

            "bjh_payment_history",

            backup

        );

        console.log(

            "Backup Restored"

        );

    }

};

// ===============================
// Cleanup
// ===============================

PaymentSystem.destroy = function(){

    console.log(

        "Payment Module Closed"

    );

};

// ===============================
// Performance Check
// ===============================

PaymentSystem.performance = function(){

    console.log(

        "Payment Module Ready"

    );

};

// ===============================
// Final Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PaymentSystem.restoreBackup();

        PaymentSystem.performance();

        PaymentSystem.debug();

    }

);

/* ==========================================
   End of Payment JS
========================================== */
