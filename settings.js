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
/* ==========================================
   BabyJohnHub Settings JS
   Large Part 1B
========================================== */

// ===============================
// Theme Manager
// ===============================

SettingsManager.applyTheme = function(){

    const settings = JSON.parse(
        localStorage.getItem("bjh_settings")
    ) || {};

    const theme = settings.theme || "dark";

    document.body.classList.remove(
        "dark-theme",
        "light-theme"
    );

    if(theme === "light"){

        document.body.classList.add("light-theme");

    }else{

        document.body.classList.add("dark-theme");

    }

};

// ===============================
// Language Manager
// ===============================

SettingsManager.applyLanguage = function(){

    const settings = JSON.parse(
        localStorage.getItem("bjh_settings")
    ) || {};

    console.log(
        "Current Language :",
        settings.language || "en"
    );

};

// ===============================
// Playback Speed
// ===============================

SettingsManager.applySpeed = function(){

    const player = document.getElementById("videoPlayer");

    if(!player) return;

    const settings = JSON.parse(
        localStorage.getItem("bjh_settings")
    ) || {};

    const speed = parseFloat(
        settings.speed || "1"
    );

    player.playbackRate = speed;

};

// ===============================
// Auto Play
// ===============================

SettingsManager.isAutoPlayEnabled = function(){

    const settings = JSON.parse(
        localStorage.getItem("bjh_settings")
    ) || {};

    return settings.autoplay ?? true;

};

// ===============================
// Notification
// ===============================

SettingsManager.isNotificationEnabled = function(){

    const settings = JSON.parse(
        localStorage.getItem("bjh_settings")
    ) || {};

    return settings.notification ?? true;

};

// ===============================
// Subtitle
// ===============================

SettingsManager.isSubtitleEnabled = function(){

    const settings = JSON.parse(
        localStorage.getItem("bjh_settings")
    ) || {};

    return settings.subtitle ?? false;

};

// ===============================
// Run All
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        SettingsManager.applyTheme();

        SettingsManager.applyLanguage();

        SettingsManager.applySpeed();

    }
);

/* ==========================================
   BabyJohnHub Settings JS
   Large Part 2A
========================================== */

// ===============================
// Quality Manager
// ===============================

SettingsManager.applyQuality = function(){

    const player = document.getElementById("videoPlayer");

    if(!player) return;

    const settings = JSON.parse(
        localStorage.getItem("bjh_settings")
    ) || {};

    const quality = settings.quality || "Auto";

    console.log(
        "Selected Quality:",
        quality
    );

};

// ===============================
// Cache Manager
// ===============================

SettingsManager.clearCache = function(){

    localStorage.removeItem("bjh_temp");

    this.showMessage(
        "🗑 Cache Cleared Successfully"
    );

};

// ===============================
// Reset Settings
// ===============================

SettingsManager.resetSettings = function(){

    localStorage.removeItem(
        "bjh_settings"
    );

    location.reload();

};

// ===============================
// Export Settings
// ===============================

SettingsManager.exportSettings = function(){

    const settings = JSON.stringify(

        JSON.parse(
            localStorage.getItem("bjh_settings")
        ) || {},

        null,

        2

    );

    const blob = new Blob(

        [settings],

        {

            type:"application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "BabyJohnHub-Settings.json";

    a.click();

    URL.revokeObjectURL(url);

};

// ===============================
// Import Settings
// ===============================

SettingsManager.importSettings = function(file){

    const reader = new FileReader();

    reader.onload = function(e){

        localStorage.setItem(

            "bjh_settings",

            e.target.result

        );

        location.reload();

    };

    reader.readAsText(file);

};

// ===============================
// Theme Change Event
// ===============================

const themeSelect =
document.getElementById(
    "themeSelect"
);

if(themeSelect){

themeSelect.addEventListener(

"change",

()=>{

SettingsManager.saveSettings();

SettingsManager.applyTheme();

}

);

}
/* ==========================================
   BabyJohnHub Settings JS
   Large Part 2B
========================================== */

// ===============================
// Notification Permission
// ===============================

SettingsManager.requestNotificationPermission = async function(){

    if(!("Notification" in window)){

        console.log("Notification not supported");

        return;

    }

    if(Notification.permission === "default"){

        await Notification.requestPermission();

    }

};

// ===============================
// Send Notification
// ===============================

SettingsManager.sendNotification = function(title, body){

    if(Notification.permission !== "granted") return;

    new Notification(title,{

        body:body,

        icon:"images/logo.png"

    });

};

// ===============================
// Auto Save Settings
// ===============================

SettingsManager.autoSave = function(){

    const ids = [

        "languageSelect",
        "themeSelect",
        "qualitySelect",
        "speedSelect",
        "subtitleToggle",
        "notificationToggle",
        "autoplayToggle"

    ];

    ids.forEach(id=>{

        const element = document.getElementById(id);

        if(!element) return;

        element.addEventListener("change",()=>{

            SettingsManager.saveSettings();

        });

    });

};

// ===============================
// Settings Statistics
// ===============================

SettingsManager.printSettings = function(){

    const settings = JSON.parse(

        localStorage.getItem("bjh_settings")

    ) || {};

    console.table(settings);

};

// ===============================
// Initialize Extra Features
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        SettingsManager.autoSave();

        SettingsManager.requestNotificationPermission();

        SettingsManager.printSettings();

    }

);
