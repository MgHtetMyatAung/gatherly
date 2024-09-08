import axios from 'axios';
import { getToken } from '@/lib/helper';

const API_BASE_URL = 'https://codemal.newwaymm.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Full error object:', error);
    }
    return Promise.reject(error);
  }
);

export default api;
