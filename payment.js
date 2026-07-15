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
