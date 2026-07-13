/* ======================================
   BabyJohnHub OTT
   Episode Database
====================================== */

const episodes = [

{
id:1,
title:"Hatim Episode 1",
video:"videos/episode1.mp4",
thumbnail:"images/episode1.jpg"
},

{
id:2,
title:"Hatim Episode 2",
video:"videos/episode2.mp4",
thumbnail:"images/episode2.jpg"
},

{
id:3,
title:"Hatim Episode 3",
video:"videos/episode3.mp4",
thumbnail:"images/episode3.jpg"
},

{
id:4,
title:"Hatim Episode 4",
video:"videos/episode4.mp4",
thumbnail:"images/episode4.jpg"
},

{
id:5,
title:"Hatim Episode 5",
video:"videos/episode5.mp4",
thumbnail:"images/episode5.jpg"
}

];

console.log("Episodes Loaded:", episodes);

/* ======================================
   BabyJohnHub OTT
   Episode Search System
====================================== */

// Search Episode by Title

function searchEpisode(keyword) {

    keyword = keyword.toLowerCase();

    return episodes.filter(function (episode) {

        return episode.title.toLowerCase().includes(keyword);

    });

}

// Display Search Results

function showSearchResults(keyword) {

    let results = searchEpisode(keyword);

    console.clear();
    console.log("Search Results:");

    if (results.length === 0) {

        console.log("No Episode Found.");

        return;

    }

    results.forEach(function (episode) {

        console.log(
            episode.id +
            " - " +
            episode.title
        );

    });

}

// Example

// showSearchResults("Hatim");
// showSearchResults("Episode 3");

/* ======================================
   BabyJohnHub OTT
   Episode Cards Generator
====================================== */

function renderEpisodes(list = episodes) {

    const episodeList = document.getElementById("episodeList");

    if (!episodeList) return;

    episodeList.innerHTML = "";

    list.forEach(function(episode){

        episodeList.innerHTML += `

        <div class="episode-card">

            <img src="${episode.thumbnail}" alt="${episode.title}">

            <h3>${episode.title}</h3>

            <button onclick="playEpisode(${episode.id})">

                ▶ Watch Now

            </button>

        </div>

        `;

    });

}

// Website Load

document.addEventListener("DOMContentLoaded", function(){

    renderEpisodes();

});
