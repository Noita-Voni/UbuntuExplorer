import axios from 'axios';
import type { User, Experience, RegisterData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: RegisterData): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Countries API
export const countriesAPI = {
  getCountries: async () => {
    const response = await api.get('/countries');
    return response.data;
  },

  getCountryByName: async (name: string) => {
    const response = await api.get(`/countries/${encodeURIComponent(name)}`);
    return response.data;
  },
};

// Experiences API
export const experiencesAPI = {
  getExperiences: async (filters?: {
    country?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Experience[]> => {
    const response = await api.get('/experiences', { params: filters });
    return response.data;
  },

  getExperienceById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },

  createExperience: async (experienceData: Partial<Experience>): Promise<Experience> => {
    const response = await api.post('/experiences', experienceData);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  getUserBookings: async (): Promise<any[]> => {
    const response = await api.get('/users/bookings');
    return response.data;
  },
};

export default api;
