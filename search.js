/* ==========================================================
   BabyJohnHub OTT
   Search System
   search.js
   Large Part 1 / 3
========================================================== */

"use strict";

/* ======================================
   Elements
====================================== */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const genreFilter = document.getElementById("genreFilter");
const languageFilter = document.getElementById("languageFilter");
const yearFilter = document.getElementById("yearFilter");

const searchResults = document.getElementById("searchResults");

/* ======================================
   Local Storage
====================================== */

const SEARCH_HISTORY_KEY = "BJH_SEARCH_HISTORY";

/* ======================================
   Get Movies
====================================== */

function getSearchMovies() {

    if (typeof getMovies === "function") {

        return getMovies();

    }

    return [];

}

/* ======================================
   Save Search
====================================== */

function saveSearch(keyword) {

    if (!keyword) return;

    let history =
        JSON.parse(
            localStorage.getItem(
                SEARCH_HISTORY_KEY
            )
        ) || [];

    history = history.filter(
        item => item !== keyword
    );

    history.unshift(keyword);

    if (history.length > 10) {

        history.length = 10;

    }

    localStorage.setItem(

        SEARCH_HISTORY_KEY,

        JSON.stringify(history)

    );

}

/* ======================================
   Get Search History
====================================== */

function getSearchHistory() {

    return JSON.parse(

        localStorage.getItem(

            SEARCH_HISTORY_KEY

        )

    ) || [];

}

/* ======================================
   Render Search Result
====================================== */

function renderSearchResults(list) {

    searchResults.innerHTML = "";

    if (!list.length) {

        searchResults.innerHTML = `

        <div class="no-results">

            <h3>No Results Found</h3>

            <p>Try another keyword.</p>

        </div>

        `;

        return;

    }

    list.forEach(movie => {

        searchResults.innerHTML += `

        <div class="search-card fade-up">

            <img src="${movie.poster}" alt="">

            <div class="badge-container">

                <span class="badge badge-new">

                    NEW

                </span>

            </div>

            <div class="rating-badge">

                ⭐ ${movie.rating || "N/A"}

            </div>

            <div class="search-overlay">

                <div class="search-play">

                    ▶

                </div>

            </div>

            <div class="search-card-body">

                <div class="search-card-title">

                    ${movie.name}

                </div>

                <div class="search-card-info">

                    <span>

                        ${movie.language}

                    </span>

                    <span class="search-rating">

                        ${movie.year}

                    </span>

                </div>

            </div>

        </div>

        `;

    });

}

/* ======================================
   Search Logic
====================================== */

function searchMovies() {

    const keyword =
        searchInput.value
        .trim()
        .toLowerCase();

    saveSearch(keyword);

    let movies = getSearchMovies();

    movies = movies.filter(movie => {

        return (

            movie.name
            .toLowerCase()
            .includes(keyword)

        );

    });

    renderSearchResults(movies);

}

console.log("Search Large Part 1 Ready");

/* ==========================================================
   BabyJohnHub OTT
   Search System
   search.js
   Large Part 2 / 3
========================================================== */

/* ======================================
   Filter Movies
====================================== */

function filterMovies() {

    const keyword = searchInput.value.trim().toLowerCase();

    const genre = genreFilter.value;

    const language = languageFilter.value;

    const year = yearFilter.value;

    let movies = getSearchMovies();

    movies = movies.filter(movie => {

        const matchKeyword =

            !keyword ||

            movie.name.toLowerCase().includes(keyword) ||

            (movie.description || "")
            .toLowerCase()
            .includes(keyword);

        const matchGenre =

            !genre ||

            movie.genre === genre;

        const matchLanguage =

            !language ||

            movie.language === language;

        const matchYear =

            !year ||

            String(movie.year) === String(year);

        return (

            matchKeyword &&

            matchGenre &&

            matchLanguage &&

            matchYear

        );

    });

    renderSearchResults(movies);

}

/* ======================================
   Live Search
====================================== */

searchInput.addEventListener(

    "input",

    filterMovies

);

/* ======================================
   Search Button
====================================== */

searchBtn.addEventListener(

    "click",

    filterMovies

);

/* ======================================
   Filter Events
====================================== */

genreFilter.addEventListener(

    "change",

    filterMovies

);

languageFilter.addEventListener(

    "change",

    filterMovies

);

yearFilter.addEventListener(

    "change",

    filterMovies

);

/* ======================================
   Enter Key Search
====================================== */

searchInput.addEventListener(

    "keydown",

    function(e){

        if(e.key==="Enter"){

            filterMovies();

        }

    }

);

/* ======================================
   Clear Search
====================================== */

function clearSearch(){

    searchInput.value="";

    genreFilter.value="";

    languageFilter.value="";

    yearFilter.value="";

    filterMovies();

}

/* ======================================
   Load Recent Searches
====================================== */

function loadRecentSearches(){

    const history = getSearchHistory();

    const recentBox =

        document.getElementById(

            "recentSearches"

        );

    if(!recentBox) return;

    recentBox.innerHTML="";

    history.forEach(item=>{

        recentBox.innerHTML+=`

        <span class="recent-item">

            ${item}

        </span>

        `;

    });

}

console.log("Search Large Part 2 Ready");
