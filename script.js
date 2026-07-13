/* =====================================
   BabyJohnHub OTT
   script.js V2 - Part 1/3
===================================== */

// Search Episodes

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

let filter = searchInput.value.toLowerCase();

let cards = document.querySelectorAll(".episode-card");

cards.forEach(function(card){

let title = card.querySelector("h3").innerText.toLowerCase();

if(title.includes(filter)){
card.style.display="block";
}
else{
card.style.display="none";
}

});

});

/* =====================================
   BabyJohnHub OTT
   script.js V2 - Part 2/3
===================================== */

// Share Button

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {
  shareBtn.addEventListener("click", async function () {

    if (navigator.share) {
      try {
        await navigator.share({
          title: "BabyJohnHub OTT",
          text: "Watch this episode on BabyJohnHub",
          url: window.location.href
        });
      } catch (e) {
        console.log("Share cancelled");
      }
    } else {
      alert("Sharing is not supported on this device.");
    }

  });
}

// Copy Link Button

const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {
  copyBtn.addEventListener("click", function () {

    navigator.clipboard.writeText(window.location.href);

    alert("Episode link copied successfully!");

  });
}

// Previous Episode

const prevEpisode = document.getElementById("prevEpisode");

if (prevEpisode) {
  prevEpisode.addEventListener("click", function () {

    alert("Previous Episode feature will be connected later.");

  });
}

// Next Episode

const nextEpisode = document.getElementById("nextEpisode");

if (nextEpisode) {
  nextEpisode.addEventListener("click", function () {

    alert("Next Episode feature will be connected later.");

  });
}

// Video Ready

const videoPlayer = document.getElementById("videoPlayer");

if (videoPlayer) {

  videoPlayer.addEventListener("loadeddata", function () {

    console.log("Video Loaded Successfully");

  });

}

/* =====================================
   BabyJohnHub OTT
   script.js V2 - Part 3/3
===================================== */

// Favorite Button (Future Ready)

let favorites = [];

document.querySelectorAll(".episode-card").forEach(function(card){

card.addEventListener("dblclick", function(){

let title = card.querySelector("h3").innerText;

if(!favorites.includes(title)){

favorites.push(title);

alert(title + " added to Favorites ❤️");

}else{

alert(title + " is already in Favorites.");

}

});

});

// Scroll To Top Button

const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = "⬆";

scrollBtn.id = "scrollTopBtn";

document.body.appendChild(scrollBtn);

scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.right = "20px";
scrollBtn.style.padding = "12px";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.border = "none";
scrollBtn.style.background = "#ff2d2d";
scrollBtn.style.color = "#fff";
scrollBtn.style.display = "none";
scrollBtn.style.cursor = "pointer";

window.addEventListener("scroll", function(){

if(window.scrollY > 300){

scrollBtn.style.display = "block";

}else{

scrollBtn.style.display = "none";

}

});

scrollBtn.addEventListener("click", function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// Website Loaded

window.addEventListener("load",function(){

console.log("BabyJohnHub OTT Loaded Successfully");

});

// Future Ready

console.log("BJH OTT Master Project - Step 1 Complete");

// Watch Now Button

const watchBtn = document.getElementById("watchNow");

watchBtn.addEventListener("click",function(){

document.querySelector(".video-player").scrollIntoView({

behavior:"smooth"

});

});

// Like Button

const likeBtn=document.getElementById("likeBtn");

let liked=false;

likeBtn.addEventListener("click",function(){

liked=!liked;

if(liked){

likeBtn.innerHTML="❤️ Liked";

}

else{

likeBtn.innerHTML="❤️ Like";

}

});
