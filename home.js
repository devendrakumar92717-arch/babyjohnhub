/* ======================================
   BabyJohnHub OTT
   Home Page
   Part 1/6
====================================== */

// Hero Banner Movies

let heroMovies = [];

// Current Slide

let currentHeroSlide = 0;

// Load Hero Movies

function loadHeroMovies() {

    heroMovies = getFeaturedMovies();

    if (heroMovies.length === 0) {

        heroMovies = getTrendingMovies(5);

    }

}

// Get Current Hero Movie

function getCurrentHeroMovie() {

    if (heroMovies.length === 0) return null;

    return heroMovies[currentHeroSlide];

}

// Next Slide

function nextHeroSlide() {

    if (heroMovies.length === 0) return;

    currentHeroSlide++;

    if (currentHeroSlide >= heroMovies.length) {

        currentHeroSlide = 0;

    }

    renderHeroBanner();

}

// Previous Slide

function previousHeroSlide() {

    if (heroMovies.length === 0) return;

    currentHeroSlide--;

    if (currentHeroSlide < 0) {

        currentHeroSlide = heroMovies.length - 1;

    }

    renderHeroBanner();

}

console.log("Home Part 1 Ready");

/* ======================================
   BabyJohnHub OTT
   Home Page
   Part 2/6
====================================== */

// Render Hero Banner

function renderHeroBanner() {

    const movie = getCurrentHeroMovie();

    if (!movie) return;

    console.log("Hero Banner:", movie.name);

    // HTML Update बाद में करेंगे

}

// Auto Slider

function startHeroSlider() {

    setInterval(() => {

        nextHeroSlide();

    }, 5000);

}

// Slider Dots

function getHeroDots() {

    return heroMovies.map((movie, index) => ({

        index,

        active: index === currentHeroSlide

    }));

}

// Go To Slide

function goToHeroSlide(index) {

    if (index < 0 || index >= heroMovies.length) return;

    currentHeroSlide = index;

    renderHeroBanner();

}

// Initialize Home

function initHomePage() {

    loadHeroMovies();

    renderHeroBanner();

    startHeroSlider();

}

console.log("Home Part 2 Ready");

/* ======================================
   BabyJohnHub OTT
   Home Page
   Part 3/6
====================================== */

// Trending Movies

function loadTrendingMovies(limit = 10) {

    return getTrendingMovies(limit);

}

// Top Rated Movies

function loadTopRatedMovies(limit = 10) {

    return getTopRatedMovies(limit);

}

// New Releases

function loadNewReleaseMovies(limit = 10) {

    return getNewReleases(limit);

}

// Continue Watching

function loadContinueWatching() {

    return JSON.parse(

        localStorage.getItem("bjh_continue")

    ) || [];

}

// Home Sections

function getHomeSections() {

    return {

        trending: loadTrendingMovies(),

        topRated: loadTopRatedMovies(),

        newReleases: loadNewReleaseMovies(),

        continueWatching: loadContinueWatching()

    };

}

console.log("Home Part 3 Ready");

/* ======================================
   BabyJohnHub OTT
   Home Page
   Part 4/6
====================================== */

// Search Movies

function homeSearch(query) {

    query = query.toLowerCase();

    return getMovies().filter(movie =>

        (movie.name || "").toLowerCase().includes(query) ||

        (movie.description || "").toLowerCase().includes(query)

    );

}

// Category Filter

function getMoviesByCategory(category) {

    if (category === "All") {

        return getMovies();

    }

    return getMovies().filter(movie =>

        movie.category === category

    );

}

// Language Filter

function getMoviesByLanguage(language) {

    if (language === "All") {

        return getMovies();

    }

    return getMovies().filter(movie =>

        movie.language === language

    );

}

// Smart Recommendation

function getRecommendedForHome(limit = 10) {

    return getMovies()

        .filter(movie => movie.featured)

        .slice(0, limit);

}

console.log("Home Part 4 Ready");

/* ======================================
   BabyJohnHub OTT
   Home Page
   Part 5/6
====================================== */

// Watchlist

function getWatchlist() {

    return JSON.parse(
        localStorage.getItem("bjh_watchlist")
    ) || [];

}

// Recently Watched

function getRecentlyWatched(limit = 10) {

    return JSON.parse(
        localStorage.getItem("bjh_recently_watched")
    ) || [];

}

// Continue Watching Progress

function getContinueWatchingProgress() {

    return JSON.parse(
        localStorage.getItem("bjh_continue")
    ) || [];

}

// Popular This Week

function getPopularThisWeek(limit = 10) {

    return getMovies()

        .sort((a, b) =>

            (b.weeklyViews || 0) -

            (a.weeklyViews || 0)

        )

        .slice(0, limit);

}

// Home Dashboard

function getHomeDashboard() {

    return {

        watchlist: getWatchlist(),

        recentlyWatched: getRecentlyWatched(),

        continueWatching: getContinueWatchingProgress(),

        popularThisWeek: getPopularThisWeek()

    };

}

console.log("Home Part 5 Ready");

/* ======================================
   BabyJohnHub OTT
   Home Page
   Part 6/6
====================================== */

// Home Statistics

function getHomeStats() {

    return {

        totalMovies: getMovies().length,

        trending: getTrendingMovies().length,

        featured: getFeaturedMovies().length,

        watchlist: getWatchlist().length

    };

}

// Refresh Home

function refreshHomePage() {

    loadHeroMovies();

    renderHeroBanner();

    console.log("Home Refreshed");

}

// Initialize

window.addEventListener("load", () => {

    initHomePage();

    console.table(getHomeStats());

});

// Auto Refresh Every 5 Minutes

setInterval(() => {

    refreshHomePage();

}, 300000);

console.log("BabyJohnHub Home Ready");

const filterButtons = document.querySelectorAll(".trending-filter button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

    });
});
