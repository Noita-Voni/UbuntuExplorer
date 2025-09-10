# Ubuntu Explorer Backend

Backend API for Ubuntu Explorer - AI-Powered G20 Tourism Platform

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env` and update the values
   - For MongoDB Atlas: Replace `MONGODB_URI` with your connection string
   - For local MongoDB: Keep the default `mongodb://localhost:27017/ubuntu-explorer`

4. Seed the database with sample data:
```bash
node scripts/seedDatabase.js
```

5. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/v1/health` - Check if API is running

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user profile
- `PUT /api/v1/auth/profile` - Update user profile

### Countries
- `GET /api/v1/countries` - Get all countries
- `GET /api/v1/countries/:id` - Get single country
- `GET /api/v1/countries/name/:name` - Get country by name
- `GET /api/v1/countries/region/:region` - Get countries by region

### Experiences
- `GET /api/v1/experiences` - Get all experiences
- `GET /api/v1/experiences/:id` - Get single experience
- `GET /api/v1/experiences/country/:countryId` - Get experiences by country
- `GET /api/v1/experiences/featured/list` - Get featured experiences
- `GET /api/v1/experiences/near/search` - Search experiences near location

### Users
- `GET /api/v1/users/:id` - Get user profile
- `POST /api/v1/users/wishlist/:experienceId` - Add to wishlist
- `DELETE /api/v1/users/wishlist/:experienceId` - Remove from wishlist
- `GET /api/v1/users/wishlist/list` - Get user's wishlist
- `POST /api/v1/users/visited-countries` - Add visited country
- `PUT /api/v1/users/preferences` - Update user preferences

## Example API Calls

### Register a new user:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "interests": ["adventure", "culture"]
  }'
```

### Get all countries:
```bash
curl http://localhost:5000/api/v1/countries
```

### Search experiences:
```bash
curl "http://localhost:5000/api/v1/experiences?category=adventure&country=COUNTRY_ID"
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## Database Models

### User Model
- Authentication and profile management
- Wishlist and visited countries tracking
- User preferences and interests

### Country Model
- G20 country information
- Geographic and cultural data
- Tourism statistics

### Experience Model
- Tourism experiences and activities
- Location-based data with geospatial indexing
- Pricing, ratings, and availability

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation

## Development

### Start in development mode:
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

## Frontend Integration

Update your frontend JavaScript to make API calls to the backend:

```javascript
const API_BASE_URL = 'http://localhost:5000/api/v1';

// Example: Fetch countries
async function fetchCountries() {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`);
    const data = await response.json();
    return data.data.countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

// Example: User login
async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    
    if (data.status === 'success') {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
  }
}
```
