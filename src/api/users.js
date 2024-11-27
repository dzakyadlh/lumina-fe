import axios from 'axios';
import { refreshToken } from './auth';

const token = localStorage.getItem('access_token');
const user = JSON.parse(localStorage.getItem('user'));
const user_id = user?.id;

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/likes',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  timeout: 5000,
});

export async function getWatchlist() {
  try {
    const response = await axiosInstance.get('/');
    return response.data.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      token = refreshToken().access;
    }
    throw error.response?.data?.message || 'Fetch watchlist failed';
  }
}

export async function addWatchlist(movie_id) {
  try {
    const response = await axiosInstance.patch(`/${user_id}/`, {
      movie_id,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      token = refreshToken().access;
    }
    throw error.response?.data?.message || 'Add watchlist failed';
  }
}

export async function removeWatchlist(movie_id) {
  try {
    const response = await axiosInstance.delete(`/${user_id}/`, {
      data: { movie_id },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      token = refreshToken().access;
    }
    throw error.response?.data?.message || 'Add watchlist failed';
  }
}
