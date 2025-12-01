const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Get genres (Action, Comedy, Drama, etc.)
export async function getGenres() {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
}

// Movies by genre
export async function getMoviesByGenre(genreId, page = 1) {
    const safePage = page  

    const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${safePage}`
    );
    const data = await response.json();

    return {
        results: data.results,
        totalPages: data.total_pages
    };
}

// Popular movies
export async function getPopularMovies() {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

// Search movies by text
export async function searchMovies(query, page = 1) {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    return res.json(); 
}

// Movie details by ID
export async function getMovieDetails(movieId) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
}

// Get related/similar movies
export async function getSimilarMovies(movieId) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
}

// Movies by categories (Popular, Top Rated, ...)
export async function getMoviesByCategory(type, page = 1) {
    const res = await fetch(
        `${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`
    );
    return res.json(); 
}
