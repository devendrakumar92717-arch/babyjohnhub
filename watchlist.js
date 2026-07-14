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
