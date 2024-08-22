import {API_KEY} from '@env';

export const baseImagePath = (size, path) => {
    return `https://image.tmdb.org/t/p/${size}/${path}`;
}
export const upcomingMovies = `https://moviesdatabase.p.rapidapi.com/titles/x/upcoming`;
export const popularMovies = `https://moviesdatabase.p.rapidapi.com/titles`;
export const searchMovies = (keyword) => {
    return `https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}?exact=false&titleType=movie`;
}
export const movieDetails = (id) => {
    return `https://moviesdatabase.p.rapidapi.com/titles/${id}`;
}
export const movieRating = (id) => {
    return `https://moviesdatabase.p.rapidapi.com/titles/${id}/ratings`;
}

export const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
    }
  };
