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
