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

/* ==========================================
   BabyJohnHub Player Settings JS
   Large Part 2A
========================================== */

// ===============================
// Playback Speed
// ===============================

PlayerSettings.changeSpeed = function(){

    if(!this.video) return;

    const speed = document.getElementById(
        "speedSelect"
    );

    if(speed){

        this.video.playbackRate = Number(speed.value);

        console.log(
            "Speed:",
            speed.value + "x"
        );

    }

};

// ===============================
// Picture in Picture
// ===============================

PlayerSettings.pictureInPicture = async function(){

    if(!this.video) return;

    try{

        if(document.pictureInPictureElement){

            await document.exitPictureInPicture();

        }else{

            await this.video.requestPictureInPicture();

        }

    }catch(error){

        console.log(
            "PiP Error:",
            error
        );

    }

};

// ===============================
// Volume
// ===============================

PlayerSettings.setVolume = function(value){

    if(!this.video) return;

    this.video.volume = value;

    console.log(
        "Volume:",
        value
    );

};

// ===============================
// Brightness
// ===============================

PlayerSettings.setBrightness = function(value){

    if(!this.video) return;

    this.video.style.filter =
        `brightness(${value})`;

    console.log(
        "Brightness:",
        value
    );

};

// ===============================
// Reset Player
// ===============================

PlayerSettings.resetPlayer = function(){

    if(!this.video) return;

    this.video.playbackRate = 1;

    this.video.volume = 1;

    this.video.style.filter = "brightness(1)";

    console.log(
        "Player Reset"
    );

};

// ===============================
// Events
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        document.getElementById(
            "speedSelect"
        )?.addEventListener(
            "change",
            ()=>{

                PlayerSettings.changeSpeed();

            }
        );

        document.getElementById(
            "pipButton"
        )?.addEventListener(
            "click",
            ()=>{

                PlayerSettings.pictureInPicture();

            }
        );

    }

);
