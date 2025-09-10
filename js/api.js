// Ubuntu Explorer API Integration
// Add this to your existing frontend to connect with the backend

class UbuntuExplorerAPI {
  constructor() {
    this.baseURL = 'http://localhost:5000/api/v1';
    this.token = localStorage.getItem('ubuntu_token');
  }

  // Set authorization header
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Authentication Methods
  async register(userData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        this.token = data.data.token;
        localStorage.setItem('ubuntu_token', this.token);
        localStorage.setItem('ubuntu_user', JSON.stringify(data.data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        this.token = data.data.token;
        localStorage.setItem('ubuntu_token', this.token);
        localStorage.setItem('ubuntu_user', JSON.stringify(data.data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('ubuntu_token');
    localStorage.removeItem('ubuntu_user');
  }

  // Countries Methods
  async getCountries(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams ? `${this.baseURL}/countries?${queryParams}` : `${this.baseURL}/countries`;
      
      const response = await fetch(url, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get countries error:', error);
      throw error;
    }
  }

  async getCountryByName(name) {
    try {
      const response = await fetch(`${this.baseURL}/countries/name/${encodeURIComponent(name)}`, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get country error:', error);
      throw error;
    }
  }

  async getCountriesByRegion(region) {
    try {
      const response = await fetch(`${this.baseURL}/countries/region/${region}`, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get countries by region error:', error);
      throw error;
    }
  }

  // Experiences Methods
  async getExperiences(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams ? `${this.baseURL}/experiences?${queryParams}` : `${this.baseURL}/experiences`;
      
      const response = await fetch(url, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get experiences error:', error);
      throw error;
    }
  }

  async getExperience(id) {
    try {
      const response = await fetch(`${this.baseURL}/experiences/${id}`, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get experience error:', error);
      throw error;
    }
  }

  async getFeaturedExperiences(limit = 6) {
    try {
      const response = await fetch(`${this.baseURL}/experiences/featured/list?limit=${limit}`, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get featured experiences error:', error);
      throw error;
    }
  }

  async getExperiencesByCountry(countryId, filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams 
        ? `${this.baseURL}/experiences/country/${countryId}?${queryParams}` 
        : `${this.baseURL}/experiences/country/${countryId}`;
      
      const response = await fetch(url, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get experiences by country error:', error);
      throw error;
    }
  }

  // User Methods
  async getCurrentUser() {
    try {
      const response = await fetch(`${this.baseURL}/auth/me`, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  async addToWishlist(experienceId) {
    try {
      const response = await fetch(`${this.baseURL}/users/wishlist/${experienceId}`, {
        method: 'POST',
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Add to wishlist error:', error);
      throw error;
    }
  }

  async removeFromWishlist(experienceId) {
    try {
      const response = await fetch(`${this.baseURL}/users/wishlist/${experienceId}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      throw error;
    }
  }

  async getWishlist() {
    try {
      const response = await fetch(`${this.baseURL}/users/wishlist/list`, {
        headers: this.getHeaders()
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get wishlist error:', error);
      throw error;
    }
  }

  // Utility Methods
  isLoggedIn() {
    return !!this.token;
  }

  getCurrentUserFromStorage() {
    const userJson = localStorage.getItem('ubuntu_user');
    return userJson ? JSON.parse(userJson) : null;
  }
}

// Create global instance
const ubuntuAPI = new UbuntuExplorerAPI();

// Example usage:
// 
// // Login
// ubuntuAPI.login('user@example.com', 'password123').then(response => {
//   if (response.status === 'success') {
//     console.log('Login successful!', response.data.user);
//   }
// });
//
// // Get countries
// ubuntuAPI.getCountries({ region: 'africa', featured: 'true' }).then(response => {
//   console.log('Countries:', response.data.countries);
// });
//
// // Get experiences
// ubuntuAPI.getExperiences({ category: 'adventure', limit: 10 }).then(response => {
//   console.log('Experiences:', response.data.experiences);
// });

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UbuntuExplorerAPI;
}
