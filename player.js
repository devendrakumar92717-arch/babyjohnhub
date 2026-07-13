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
