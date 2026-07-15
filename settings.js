/* ==========================================
   BabyJohnHub Settings JS
   Large Part 1A
========================================== */

// ===============================
// Settings Manager
// ===============================

const SettingsManager = {

    init() {

        this.loadSettings();

        this.bindEvents();

        console.log("Settings Loaded");

    },

    bindEvents() {

        const saveBtn = document.getElementById("saveSettingsBtn");

        if(saveBtn){

            saveBtn.addEventListener("click", () => {

                this.saveSettings();

            });

        }

    },

    loadSettings() {

        const settings = JSON.parse(

            localStorage.getItem("bjh_settings")

        ) || {};

        if(document.getElementById("languageSelect"))

            document.getElementById("languageSelect").value = settings.language || "en";

        if(document.getElementById("themeSelect"))

            document.getElementById("themeSelect").value = settings.theme || "dark";

        if(document.getElementById("qualitySelect"))

            document.getElementById("qualitySelect").value = settings.quality || "Auto";

        if(document.getElementById("speedSelect"))

            document.getElementById("speedSelect").value = settings.speed || "1x";

        if(document.getElementById("subtitleToggle"))

            document.getElementById("subtitleToggle").checked = settings.subtitle || false;

        if(document.getElementById("notificationToggle"))

            document.getElementById("notificationToggle").checked = settings.notification ?? true;

        if(document.getElementById("autoplayToggle"))

            document.getElementById("autoplayToggle").checked = settings.autoplay ?? true;

    },

    saveSettings() {

        const settings = {

            language:

            document.getElementById("languageSelect").value,

            theme:

            document.getElementById("themeSelect").value,

            quality:

            document.getElementById("qualitySelect").value,

            speed:

            document.getElementById("speedSelect").value,

            subtitle:

            document.getElementById("subtitleToggle").checked,

            notification:

            document.getElementById("notificationToggle").checked,

            autoplay:

            document.getElementById("autoplayToggle").checked

        };

        localStorage.setItem(

            "bjh_settings",

            JSON.stringify(settings)

        );

        this.showMessage(

            "✅ Settings Saved Successfully"

        );

    },

    showMessage(message){

        alert(message);

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SettingsManager.init();

    }

);
