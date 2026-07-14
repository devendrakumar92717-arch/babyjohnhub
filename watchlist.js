/* ==========================================================
   BabyJohnHub OTT
   Watchlist System
   watchlist.js
   Large Part 1 / 3
========================================================== */

"use strict";

/* ======================================
   Local Storage Keys
====================================== */

const WATCHLIST_KEY = "BJH_WATCHLIST";
const FAVORITES_KEY = "BJH_FAVORITES";
const CONTINUE_KEY = "BJH_CONTINUE_WATCHING";

/* ======================================
   Elements
====================================== */

const watchlistContainer =
document.getElementById("watchlistContainer");

/* ======================================
   Local Storage Functions
====================================== */

function getWatchlist(){

    return JSON.parse(

        localStorage.getItem(

            WATCHLIST_KEY

        )

    ) || [];

}

function saveWatchlist(list){

    localStorage.setItem(

        WATCHLIST_KEY,

        JSON.stringify(list)

    );

}

function getFavorites(){

    return JSON.parse(

        localStorage.getItem(

            FAVORITES_KEY

        )

    ) || [];

}

function saveFavorites(list){

    localStorage.setItem(

        FAVORITES_KEY,

        JSON.stringify(list)

    );

}

/* ======================================
   Add Movie
====================================== */

function addToWatchlist(movie){

    let list = getWatchlist();

    const exists = list.find(

        item => item.id === movie.id

    );

    if(exists){

        alert("Movie already added.");

        return;

    }

    list.unshift(movie);

    saveWatchlist(list);

    renderWatchlist();

}

/* ======================================
   Remove Movie
====================================== */

function removeFromWatchlist(id){

    let list = getWatchlist();

    list = list.filter(

        movie => movie.id !== id

    );

    saveWatchlist(list);

    renderWatchlist();

}

/* ======================================
   Favorite Movie
====================================== */

function toggleFavorite(movie){

    let favorites = getFavorites();

    const exists = favorites.find(

        item => item.id === movie.id

    );

    if(exists){

        favorites = favorites.filter(

            item => item.id !== movie.id

        );

    }else{

        favorites.unshift(movie);

    }

    saveFavorites(favorites);

    renderWatchlist();

}

/* ======================================
   Check Favorite
====================================== */

function isFavorite(id){

    return getFavorites().some(

        item => item.id === id

    );

}

/* ======================================
   Render Watchlist
====================================== */

function renderWatchlist(){

    if(!watchlistContainer) return;

    const list = getWatchlist();

    watchlistContainer.innerHTML = "";

    if(!list.length){

        watchlistContainer.innerHTML = `

        <div class="empty-watchlist">

            <h3>No Movies</h3>

            <p>Your Watchlist is Empty.</p>

        </div>

        `;

        return;

    }

    list.forEach(movie=>{

        watchlistContainer.innerHTML += `

        <div class="watch-card watch-fade">

            <button
            class="favorite-btn"
            data-id="${movie.id}">

            ${isFavorite(movie.id) ? "⭐" : "🤍"}

            </button>

            <button
            class="remove-watch"
            data-id="${movie.id}">

            ✕

            </button>

            <img
            src="${movie.poster}"
            alt="${movie.name}">

            <div class="watch-card-body">

                <div class="watch-title">

                    ${movie.name}

                </div>

                <div class="watch-info">

                    <span>

                        ${movie.language}

                    </span>

                    <span>

                        ${movie.year}

                    </span>

                </div>

            </div>

        </div>

        `;

    });

}

console.log("Watchlist Large Part 1 Ready");

/* ==========================================================
   BabyJohnHub OTT
   Watchlist System
   watchlist.js
   Large Part 2 / 3
========================================================== */

/* ======================================
   Continue Watching
====================================== */

function getContinueWatching(){

    return JSON.parse(

        localStorage.getItem(

            CONTINUE_KEY

        )

    ) || [];

}

function saveContinueWatching(list){

    localStorage.setItem(

        CONTINUE_KEY,

        JSON.stringify(list)

    );

}

function updateContinueWatching(movie,progress){

    let list = getContinueWatching();

    list = list.filter(

        item=>item.id!==movie.id

    );

    list.unshift({

        ...movie,

        progress:progress

    });

    saveContinueWatching(list);

}

/* ======================================
   Button Events
====================================== */

document.addEventListener("click",function(e){

    /* Remove Movie */

    if(e.target.classList.contains("remove-watch")){

        const id = Number(

            e.target.dataset.id

        );

        removeFromWatchlist(id);

    }

    /* Favorite */

    if(e.target.classList.contains("favorite-btn")){

        const id = Number(

            e.target.dataset.id

        );

        const movie = getWatchlist().find(

            item=>item.id===id

        );

        if(movie){

            toggleFavorite(movie);

        }

    }

});

/* ======================================
   Render Continue Watching
====================================== */

function renderContinueWatching(){

    const data = getContinueWatching();

    console.log(

        "Continue Watching",

        data

    );

}

/* ======================================
   Watch History
====================================== */

function addWatchHistory(movie){

    let history = JSON.parse(

        localStorage.getItem(

            "BJH_HISTORY"

        )

    ) || [];

    history = history.filter(

        item=>item.id!==movie.id

    );

    history.unshift({

        ...movie,

        watchedAt:new Date().toISOString()

    });

    if(history.length>20){

        history.length=20;

    }

    localStorage.setItem(

        "BJH_HISTORY",

        JSON.stringify(history)

    );

}

/* ======================================
   Get History
====================================== */

function getWatchHistory(){

    return JSON.parse(

        localStorage.getItem(

            "BJH_HISTORY"

        )

    ) || [];

}

/* ======================================
   Clear History
====================================== */

function clearWatchHistory(){

    localStorage.removeItem(

        "BJH_HISTORY"

    );

}

/* ======================================
   Refresh
====================================== */

function refreshWatchlist(){

    renderWatchlist();

    renderContinueWatching();

}

console.log("Watchlist Large Part 2 Ready");

/* ==========================================================
   BabyJohnHub OTT
   Watchlist System
   watchlist.js
   Large Part 3 / 3
========================================================== */

/* ======================================
   Render Favorites
====================================== */

function renderFavorites(){

    const favorites = getFavorites();

    console.log("Favorites Loaded", favorites.length);

    return favorites;

}

/* ======================================
   Statistics
====================================== */

function getWatchlistStats(){

    return {

        totalWatchlist : getWatchlist().length,

        totalFavorites : getFavorites().length,

        totalContinue : getContinueWatching().length,

        totalHistory : getWatchHistory().length

    };

}

/* ======================================
   Clear Watchlist
====================================== */

function clearWatchlist(){

    localStorage.removeItem(WATCHLIST_KEY);

    renderWatchlist();

}

/* ======================================
   Clear Favorites
====================================== */

function clearFavorites(){

    localStorage.removeItem(FAVORITES_KEY);

    renderWatchlist();

}

/* ======================================
   Export Watchlist
====================================== */

function exportWatchlist(){

    const data = {

        watchlist : getWatchlist(),

        favorites : getFavorites(),

        history : getWatchHistory(),

        continueWatching : getContinueWatching()

    };

    return JSON.stringify(data,null,2);

}

/* ======================================
   Import Watchlist
====================================== */

function importWatchlist(data){

    try{

        const json = JSON.parse(data);

        if(json.watchlist){

            saveWatchlist(json.watchlist);

        }

        if(json.favorites){

            saveFavorites(json.favorites);

        }

        if(json.continueWatching){

            saveContinueWatching(

                json.continueWatching

            );

        }

        renderWatchlist();

        renderContinueWatching();

        console.log("Import Successful");

    }catch(error){

        console.error(error);

    }

}

/* ======================================
   Auto Load
====================================== */

window.addEventListener("load",()=>{

    renderWatchlist();

    renderContinueWatching();

});

/* ======================================
   Global API
====================================== */

window.BJHWatchlist={

    add:addToWatchlist,

    remove:removeFromWatchlist,

    favorite:toggleFavorite,

    clear:clearWatchlist,

    clearFavorites:clearFavorites,

    export:exportWatchlist,

    import:importWatchlist,

    stats:getWatchlistStats,

    history:getWatchHistory

};

/* ======================================
   Performance
====================================== */

console.log("==================================");
console.log(" BabyJohnHub Watchlist Ready");
console.log(" Watchlist Enabled");
console.log(" Favorites Enabled");
console.log(" Continue Watching Enabled");
console.log(" Watch History Enabled");
console.log("==================================");
