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
/* ==========================================
   BabyJohnHub Player Settings JS
   Large Part 2B
========================================== */

// ===============================
// Mute / Unmute
// ===============================

PlayerSettings.toggleMute = function(){

    if(!this.video) return;

    this.video.muted = !this.video.muted;

    console.log(

        this.video.muted

        ? "Muted"

        : "Unmuted"

    );

};

// ===============================
// Full Screen
// ===============================

PlayerSettings.toggleFullscreen = async function(){

    try{

        if(!document.fullscreenElement){

            await this.video.requestFullscreen();

        }else{

            await document.exitFullscreen();

        }

    }catch(error){

        console.log(error);

    }

};

// ===============================
// Auto Replay
// ===============================

PlayerSettings.autoReplay = function(){

    if(!this.video) return;

    this.video.loop = true;

    console.log("Auto Replay Enabled");

};

// ===============================
// Auto Save
// ===============================

PlayerSettings.autoSave = function(){

    this.saveSettings();

};

// ===============================
// Player Status
// ===============================

PlayerSettings.playerStatus = function(){

    if(!this.video) return;

    console.table({

        currentTime:this.video.currentTime,

        duration:this.video.duration,

        paused:this.video.paused,

        muted:this.video.muted,

        volume:this.video.volume

    });

};

// ===============================
// Restore
// ===============================

PlayerSettings.restore = function(){

    this.loadSettings();

    console.log(

        "Player Settings Restored"

    );

};

// ===============================
// Auto Save Every Minute
// ===============================

setInterval(

    ()=>{

        PlayerSettings.autoSave();

    },

    60000

);

// ===============================
// Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PlayerSettings.restore();

        PlayerSettings.playerStatus();

    }

);

/* ==========================================
   BabyJohnHub Player Settings JS
   Large Part 3A
========================================== */

// ===============================
// Player Analytics
// ===============================

PlayerSettings.analytics = function(){

    if(!this.video) return;

    const analytics = {

        duration:this.video.duration,

        currentTime:this.video.currentTime,

        playbackRate:this.video.playbackRate,

        volume:this.video.volume

    };

    console.table(analytics);

};

// ===============================
// Watch History
// ===============================

PlayerSettings.saveHistory = function(){

    if(!this.video) return;

    const history = JSON.parse(

        localStorage.getItem("player_history")

    ) || [];

    history.push({

        time:new Date().toISOString(),

        position:this.video.currentTime

    });

    localStorage.setItem(

        "player_history",

        JSON.stringify(history)

    );

};

// ===============================
// Favorite Quality
// ===============================

PlayerSettings.favoriteQuality = function(){

    const quality = document.getElementById(

        "qualitySelect"

    )?.value || "auto";

    localStorage.setItem(

        "favorite_quality",

        quality

    );

    console.log(

        "Favorite Quality:",

        quality

    );

};

// ===============================
// Backup Settings
// ===============================

PlayerSettings.backup = function(){

    const settings = localStorage.getItem(

        "bjh_player_settings"

    );

    localStorage.setItem(

        "bjh_player_settings_backup",

        settings

    );

};

// ===============================
// Auto Sync
// ===============================

PlayerSettings.sync = function(){

    console.log(

        "Player Synced"

    );

};

// ===============================
// Session Info
// ===============================

PlayerSettings.sessionInfo = function(){

    console.table({

        sessionStart:new Date().toLocaleString(),

        browser:navigator.userAgent

    });

};

// ===============================
// Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PlayerSettings.analytics();

        PlayerSettings.favoriteQuality();

        PlayerSettings.backup();

        PlayerSettings.sync();

        PlayerSettings.sessionInfo();

    }

);
/* ==========================================
   BabyJohnHub Player Settings JS
   Large Part 3B (Final)
========================================== */

// ===============================
// Version Information
// ===============================

PlayerSettings.version = {

    app: "BabyJohnHub",

    module: "Player Settings",

    version: "1.0.0"

};

console.table(PlayerSettings.version);

// ===============================
// Debug Mode
// ===============================

PlayerSettings.debug = function(){

    console.group("Player Settings Debug");

    console.log(
        "Video:",
        this.video
    );

    console.log(
        "Saved Settings:",
        JSON.parse(
            localStorage.getItem(
                "bjh_player_settings"
            )
        )
    );

    console.groupEnd();

};

// ===============================
// Performance Check
// ===============================

PlayerSettings.performanceCheck = function(){

    console.log(
        "Player Ready:",
        !!this.video
    );

};

// ===============================
// Auto Sync
// ===============================

PlayerSettings.autoSync = function(){

    this.saveSettings();

    console.log(
        "Player Settings Synced"
    );

};

// ===============================
// Cleanup
// ===============================

PlayerSettings.destroy = function(){

    console.log(
        "Player Settings Closed"
    );

};

// ===============================
// Final Initialize
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        PlayerSettings.performanceCheck();

        PlayerSettings.autoSync();

        PlayerSettings.debug();

    }

);

/* ==========================================
   End of Player Settings JS
========================================== */
