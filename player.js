/* ==========================
   BabyJohnHub Player V1
========================== */

const player=document.getElementById("videoPlayer");

function togglePlay(){

if(player.paused){

player.play();

}else{

player.pause();

}

}

function muteVideo(){

player.muted=!player.muted;

}

function fullscreenVideo(){

if(player.requestFullscreen){

player.requestFullscreen();

}

}

function favoriteEpisode(){

alert("❤️ Added to Favorites");

}

function shareEpisode(){

if(navigator.share){

navigator.share({

title:document.title,

url:location.href

});

}else{

alert("Share not supported");

}

}

function downloadEpisode(){

alert("Download Menu Coming Next");

}

/* ======================================
   BabyJohnHub OTT
   Download Popup System
====================================== */

// Download Popup

function openDownloadPopup() {

    const popup = document.getElementById("downloadPopup");

    if (popup) {

        popup.style.display = "block";

    }

}

// Close Popup

function closeDownloadPopup() {

    const popup = document.getElementById("downloadPopup");

    if (popup) {

        popup.style.display = "none";

    }

}

// Download Quality

function selectDownloadQuality(quality) {

    closeDownloadPopup();

    startDownloadProcess(quality);

}

// Processing

function startDownloadProcess(quality) {

    const status = document.getElementById("downloadStatus");

    const progress = document.getElementById("downloadProgress");

    if (!status || !progress) return;

    let percent = 0;

    status.innerHTML =
        "Preparing " + quality + " Download...";

    progress.style.width = "0%";

    const timer = setInterval(function () {

        percent += 5;

        progress.style.width = percent + "%";

        status.innerHTML =
            "Processing... " + percent + "%";

        if (percent >= 100) {

            clearInterval(timer);

            status.innerHTML =
                "✅ Download Ready";

        }

    }, 120);

}

/* ======================================
   BabyJohnHub OTT
   Download Complete System
====================================== */

function startRealDownload(quality) {

    const status = document.getElementById("downloadStatus");
    const progress = document.getElementById("downloadProgress");

    let percent = 0;

    status.innerHTML = "Preparing " + quality + "...";
    progress.style.width = "0%";

    const timer = setInterval(function () {

        percent += 10;

        progress.style.width = percent + "%";
        status.innerHTML = "Processing... " + percent + "%";

        if (percent >= 100) {

            clearInterval(timer);

            status.innerHTML =
            "✅ Download Complete";

            setTimeout(function () {

                const video =
                document.querySelector("#videoPlayer source");

                if (video) {

                    const a =
                    document.createElement("a");

                    a.href = video.src;

                    a.download = "";

                    document.body.appendChild(a);

                    a.click();

                    document.body.removeChild(a);

                }

            },800);

        }

    },250);

}

// Replace old function

function selectDownloadQuality(quality){

    closeDownloadPopup();

    startRealDownload(quality);

}

/* ======================================
   BabyJohnHub OTT
   Player Controls
====================================== */

// Forward 10 Seconds

function forward10() {

    player.currentTime += 10;

}

// Backward 10 Seconds

function backward10() {

    player.currentTime -= 10;

}

// Volume Control

const volumeSlider = document.getElementById("volumeSlider");

if (volumeSlider) {

    volumeSlider.addEventListener("input", function () {

        player.volume = this.value / 100;

    });

}

// Speed Control

const speedControl = document.getElementById("speedControl");

if (speedControl) {

    speedControl.addEventListener("change", function () {

        player.playbackRate = Number(this.value);

    });

}

// Auto Reset Speed

player.addEventListener("loadedmetadata", function () {

    if (speedControl) {

        speedControl.value = "1";

    }

    player.playbackRate = 1;

});

console.log("Player Controls Ready");

/* ======================================
   BabyJohnHub OTT
   Continue Watching System
====================================== */

// Save Video Position

player.addEventListener("timeupdate", function () {

    localStorage.setItem(
        "bjh_last_position",
        player.currentTime
    );

});

// Resume Video

player.addEventListener("loadedmetadata", function () {

    const lastPosition = localStorage.getItem(
        "bjh_last_position"
    );

    if (lastPosition) {

        player.currentTime = Number(lastPosition);

    }

});

// Watch History

function saveWatchHistory(title) {

    let history = JSON.parse(
        localStorage.getItem("bjh_history")
    ) || [];

    if (!history.includes(title)) {

        history.push(title);

    }

    localStorage.setItem(
        "bjh_history",
        JSON.stringify(history)
    );

}

// Save Current Episode

player.addEventListener("play", function () {

    const title =
        document.getElementById("episodeTitle").innerText;

    saveWatchHistory(title);

});

console.log("Continue Watching Ready");

/* ======================================
   BabyJohnHub OTT
   Final Player System
====================================== */

// Favorite System

function favoriteEpisode() {

    const title = document.getElementById("episodeTitle").innerText;

    let favorites = JSON.parse(
        localStorage.getItem("bjh_favorites")
    ) || [];

    if (!favorites.includes(title)) {

        favorites.push(title);

        localStorage.setItem(
            "bjh_favorites",
            JSON.stringify(favorites)
        );

        alert("❤️ Added to Favorites");

    } else {

        alert("❤️ Already in Favorites");

    }

}

// Advanced Share

async function shareEpisode() {

    const title = document.getElementById("episodeTitle").innerText;

    const url = window.location.href;

    if (navigator.share) {

        try {

            await navigator.share({

                title: title,

                text: "Watch on BabyJohnHub",

                url: url

            });

        } catch (e) {

            console.log("Share cancelled");

        }

    } else {

        navigator.clipboard.writeText(url);

        alert("🔗 Link Copied");

    }

}

// Copy Link

function copyLink() {

    navigator.clipboard.writeText(window.location.href);

    alert("🔗 Link Copied");

}

// Auto Play Next Episode

player.addEventListener("ended", function () {

    if (currentEpisode < episodes.length - 1) {

        playEpisode(episodes[currentEpisode + 1].id);

    }

});

console.log("BabyJohnHub Player Ready");
