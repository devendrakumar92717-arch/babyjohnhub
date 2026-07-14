/* ======================================
   BabyJohnHub OTT
   Content Management
   Part 1/6
====================================== */

// Get Movies

function getMovies() {

    return JSON.parse(
        localStorage.getItem("bjh_movies")
    ) || [];

}

// Save Movies

function saveMovies(movies) {

    localStorage.setItem(
        "bjh_movies",
        JSON.stringify(movies)
    );

}

// Add Movie

function addMovie(movieData) {

    const movies = getMovies();

    movieData.id = Date.now().toString();

    movieData.createdAt = new Date().toISOString();

    movies.push(movieData);

    saveMovies(movies);

    console.log("Movie Added Successfully");

}

// Find Movie

function findMovie(movieId) {

    return getMovies().find(

        movie => movie.id === movieId

    );

}

console.log("Content Part 1 Ready");
