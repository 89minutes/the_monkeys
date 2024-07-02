// src/api/axiosInstance.ts
import { API_URL } from '@/constants/api';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosFileInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosFileInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session && session.user && session.user.token) {
      config.headers['Authorization'] = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosFileInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // For example, redirect to login if 401
      if (error.response.status === 401) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosFileInstance;
