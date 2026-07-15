/* ==========================================
   BabyJohnHub Player Settings JS
   Large Part 1A
========================================== */

const PlayerSettings = {

    video: null,

    init() {

        this.video = document.getElementById("videoPlayer");

        this.loadSettings();

        this.bindEvents();

        console.log("Player Settings Initialized");

    },

    loadSettings() {

        const settings = JSON.parse(

            localStorage.getItem("bjh_player_settings")

        ) || {};

        const quality = document.getElementById("qualitySelect");

        const speed = document.getElementById("speedSelect");

        const subtitle = document.getElementById("subtitleToggle");

        const autoNext = document.getElementById("autoNextToggle");

        if (quality && settings.quality) {

            quality.value = settings.quality;

        }

        if (speed && settings.speed) {

            speed.value = settings.speed;

        }

        if (subtitle) {

            subtitle.checked = settings.subtitle || false;

        }

        if (autoNext) {

            autoNext.checked = settings.autoNext ?? true;

        }

        if (this.video && settings.speed) {

            this.video.playbackRate = Number(settings.speed);

        }

    },

    bindEvents() {

        const speed = document.getElementById("speedSelect");

        if (speed) {

            speed.addEventListener("change", () => {

                if (this.video) {

                    this.video.playbackRate = Number(speed.value);

                }

            });

        }

    }

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        PlayerSettings.init();

    }

);
/* ==========================================
   BabyJohnHub Player Settings JS
   Large Part 1B
========================================== */

// ===============================
// Save Settings
// ===============================

PlayerSettings.saveSettings = function(){

    const settings = {

        quality : document.getElementById(

            "qualitySelect"

        )?.value || "auto",

        speed : document.getElementById(

            "speedSelect"

        )?.value || "1",

        subtitle : document.getElementById(

            "subtitleToggle"

        )?.checked || false,

        autoNext : document.getElementById(

            "autoNextToggle"

        )?.checked ?? true

    };

    localStorage.setItem(

        "bjh_player_settings",

        JSON.stringify(settings)

    );

    console.log(

        "Player Settings Saved",

        settings

    );

};

// ===============================
// Quality Change
// ===============================

PlayerSettings.changeQuality = function(){

    const quality = document.getElementById(

        "qualitySelect"

    );

    if(!quality) return;

    console.log(

        "Quality Changed:",

        quality.value

    );

};

// ===============================
// Subtitle Toggle
// ===============================

PlayerSettings.toggleSubtitle = function(){

    const subtitle = document.getElementById(

        "subtitleToggle"

    );

    console.log(

        subtitle.checked

        ? "Subtitle ON"

        : "Subtitle OFF"

    );

};

// ===============================
// Auto Next
// ===============================

PlayerSettings.toggleAutoNext = function(){

    const autoNext = document.getElementById(

        "autoNextToggle"

    );

    console.log(

        autoNext.checked

        ? "Auto Next Enabled"

        : "Auto Next Disabled"

    );

};

// ===============================
// Events
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        document.getElementById(

            "savePlayerSettings"

        )?.addEventListener(

            "click",

            ()=>{

                PlayerSettings.saveSettings();

            }

        );

        document.getElementById(

            "qualitySelect"

        )?.addEventListener(

            "change",

            ()=>{

                PlayerSettings.changeQuality();

            }

        );

        document.getElementById(

            "subtitleToggle"

        )?.addEventListener(

            "change",

            ()=>{

                PlayerSettings.toggleSubtitle();

            }

        );

        document.getElementById(

            "autoNextToggle"

        )?.addEventListener(

            "change",

            ()=>{

                PlayerSettings.toggleAutoNext();

            }

        );

    }

);
