import axios from 'axios';

const BASE_URL = 'https://moviesdatabase.p.rapidapi.com';
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

const buildQueryString = (params) => {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
};

const fetchMovies = async ({
  param = 'default',
  title_type = 'movie',
  genre,
  title_search,
  movie_id,
  page = 1,
  randomized = false,
}) => {
  try {
    // Generate cache key
    const cacheKey = JSON.stringify({
      param,
      title_type,
      genre,
      title_search,
      movie_id,
      page,
      randomized,
    });
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    let url = BASE_URL;

    // Handle specific cases
    if (randomized) {
      url +=
        title_type === 'movie'
          ? '/titles/random?limit=8&list=top_boxoffice_200'
          : '/titles/random?limit=8&list=most_pop_series';
    } else if (title_search) {
      const url1 = `${BASE_URL}/titles/search/title/${title_search}?exact=false&titleType=movie`;
      const url2 = `${BASE_URL}/titles/search/title/${title_search}?exact=false&titleType=tvSeries`;

      const [moviesData1, moviesData2] = await Promise.all([
        axios.get(url1, { headers: getHeaders() }),
        axios.get(url2, { headers: getHeaders() }),
      ]);
      const data = [
        ...processMovies(moviesData1.data.results),
        ...processMovies(moviesData2.data.results),
      ];

      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    } else if (movie_id) {
      url += `/titles/${movie_id}?info=base_info`;
    } else {
      const queryParams = {
        endYear: new Date().getFullYear(),
        page,
        titleType: title_type,
        sort: title_search ? 'year.incr' : undefined,
        list: getListType(param, title_type),
        limit: 8,
        info: param === 'trending' ? 'base_info' : undefined,
        genre,
      };
      url += `/titles?${buildQueryString(queryParams)}`;
    }

    // Fetch data
    const response = await axios.get(url, { headers: getHeaders() });
    const data = movie_id
      ? processMovie(response.data.results)
      : processMovies(response.data.results);

    // Cache the data
    localStorage.setItem(cacheKey, JSON.stringify(data));

    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Could not fetch movie data.');
  }
};

const processMovie = (movie) => {
  return {
    movie_id: movie.id || null,
    title: movie.titleText?.text || 'Unknown Title',
    imageUrl: movie.primaryImage?.url || null,
    releaseYear: movie.releaseYear?.year || null,
    plot: movie.plot?.plotText?.plainText || null,
    genres: movie.genres?.genres || [],
    stars: movie.primaryImage?.caption?.plainText || null,
    rating: movie.ratingsSummary?.aggregateRating || null,
    runtime: movie.runtime?.seconds || null,
    episodes: movie.episodes || null,
  };
};

const processMovies = (movies) => {
  return movies.map((movie) => ({
    movie_id: movie.id || null,
    title: movie.titleText?.text || 'Unknown Title',
    imageUrl: movie.primaryImage?.url || null,
    releaseYear: movie.releaseYear?.year || null,
    is_series: movie.titleType?.isSeries || false,
    plot: movie.plot?.plotText?.plainText || null,
  }));
};

const getListType = (param, titleType) => {
  const lists = {
    default: titleType === 'movie' ? undefined : 'most_pop_series',
    trending: 'top_boxoffice_last_weekend_10',
    popular: 'top_boxoffice_200',
    popularSeries: 'top_rated_series_250',
  };
  return lists[param];
};

const getHeaders = () => ({
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
});

export default fetchMovies;
