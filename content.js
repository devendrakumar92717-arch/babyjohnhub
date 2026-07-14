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

/* ======================================
   BabyJohnHub OTT
   Content Management
   Part 2/6
====================================== */

// Update Movie

function updateMovie(movieId, updatedData) {

    let movies = getMovies();

    movies = movies.map(movie =>

        movie.id === movieId
            ? { ...movie, ...updatedData }
            : movie

    );

    saveMovies(movies);

    console.log("Movie Updated");

}

// Delete Movie

function deleteMovie(movieId) {

    const movies = getMovies().filter(

        movie => movie.id !== movieId

    );

    saveMovies(movies);

    console.log("Movie Deleted");

}

// Featured Movies

function getFeaturedMovies() {

    return getMovies().filter(

        movie => movie.featured === true

    );

}

// Recently Added

function getRecentlyAdded(limit = 10) {

    return getMovies()

        .sort((a, b) =>

            new Date(b.createdAt) -

            new Date(a.createdAt)

        )

        .slice(0, limit);

}

console.log("Content Part 2 Ready");
