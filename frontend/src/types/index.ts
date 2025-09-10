// TypeScript interfaces for Ubuntu Explorer

export interface Country {
  flag: string;
  region: 'africa' | 'america' | 'asia' | 'europe' | 'oceania';
  image: string;
  cities: string;
  experiences: number;
  rating: number;
  reviews: number;
  description: string;
  featured: boolean;
  highlights: string[];
}

export interface CountriesData {
  [countryName: string]: Country;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  experience: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'business';
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  duration: string;
  images: string[];
  highlights: string[];
  providerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'tourist' | 'business';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}
