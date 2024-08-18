import {TMDB_API_KEY} from '@env'

const apikey = '0274797abee92234ea9dd074b7f616ad';

export const baseImagePath = (size, path) => {
    return `https://image.tmdb.org/t/p/${size}/${path}`;
}
export const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`;
export const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}`;
export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;
export const searchMovies = (keyword) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${keyword}`;
}
export const movieDetails = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;
}
export const movieCastDetails = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`;
}
