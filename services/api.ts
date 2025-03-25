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
  const endpoint = query.trim()
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const options = {
    method: "GET",
    url: endpoint,
    headers: TMDB_CONFIG.headers,
  };

  try {
    console.log("Check endpoint:: ", endpoint);
    const res = await axios.request(options);
    if (!res?.data) {
      throw new Error(`Failed to fetch movies: ${res.status}`);
    }
    return res?.data?.results || {};
  } catch (err: any) {
    throw new Error(`Failed to fetch movies with message: ${err.message}`);
  }
};

export const fetchMovieDetail = async (movieId: string): Promise<MovieDetail> => {
  const options = {
    method: "GET",
    url: `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
    headers: TMDB_CONFIG.headers,
  };
  
  try {
    const res = await axios.request(options);
    if (!res?.data) {
      throw new Error(`Failed to fetch movie detail: ${res.status}`);
    }
    return res?.data || {};
  } catch (error) {
    throw new Error(`Failed to fetch movie detail: ${error}`);
  }
}

export const fetchPopularMovies = async () => {
  const options = {
    method: "GET",
    url: `${TMDB_CONFIG.BASE_URL}/movie/popular?language=en-US&page=1`,
    headers: TMDB_CONFIG.headers,
  };
  
  try {
    const res = await axios.request(options);
    if (!res?.data) {
      throw new Error(`Failed to fetch popular movies: ${res.status}`);
    }
    console.log("Check popular movies:: ", res?.data?.results);
    return res?.data?.results.slice(0, 8) || {};
  } catch (error) {
    throw new Error(`Failed to fetch popular movies: ${error}`);
  }
}
