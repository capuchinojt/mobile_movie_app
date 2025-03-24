import axios from 'axios';

export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const options = {
    method: "GET",
    url: endpoint,
    headers: TMDB_CONFIG.headers,
  };

  try {
    const res = await axios.request(options);
    if (!res?.data) {
      throw new Error(`Failed to fetch movies: ${res.status}`);
    }
    return res?.data?.results || {};
  } catch (err: any) {
    throw new Error(`Failed to fetch movies with message: ${err.message}`);
  }
};
