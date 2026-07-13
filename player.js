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
