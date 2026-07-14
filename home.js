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
