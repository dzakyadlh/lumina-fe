import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 5000,
});

export async function getTrendingMovies() {
  try {
    const response = await axiosInstance.get(`/movies/?param=trending`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || 'Fetch Movies Failed';
  }
}

export async function getPopularMovies() {
  try {
    const response = await axiosInstance.get(`/movies/?param=popular`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || 'Fetch Movies Failed';
  }
}

export async function getLatestMovies() {
  try {
    const response = await axiosInstance.get(`/movies/`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || 'Fetch Movies Failed';
  }
}
