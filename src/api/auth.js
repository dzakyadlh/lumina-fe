import axiosInstance from './axiosInstance';

export async function signIn(user) {
  try {
    const response = await axiosInstance.post(`/users/signin/`, user);
    console.log(response);
    localStorage.setItem('user', JSON.stringify(response.data.data));
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || 'Sign In Failed';
  }
}

export async function signUp(user) {
  try {
    const response = await axiosInstance.post(`/users/signup/`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || 'Sign Up Failed';
  }
}

export async function signOut() {
  try {
    const token = localStorage.removeItem('refresh_token');
    const response = await axiosInstance.post(`/users/signout/`, token);
    if (response) {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || 'Sign Out Failed';
  }
}

export async function refreshToken() {
  try {
    const token = localStorage.getItem('refresh_token');
    const response = await axiosInstance.post(`/users/token/refresh/`, token);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || 'Refresh Token Failed';
  }
}

export async function authenticateUser() {
  try {
    const token = localStorage.getItem('refresh_token');
    if (token) {
      await refreshToken();
    }
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || 'Authentication Failed';
  }
}
