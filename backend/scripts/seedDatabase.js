const mongoose = require('mongoose');
const Country = require('../models/Country');
require('dotenv').config();

// Sample G20 countries data to seed the database
const g20Countries = [
  {
    name: "South Africa",
    flag: "🇿🇦",
    region: "africa",
    image: "https://media.istockphoto.com/id/1501138479/photo/cape-town.webp",
    cities: "Cape Town, Johannesburg, Durban",
    experiencesCount: 120,
    rating: 4.8,
    reviewsCount: 1200,
    description: "From safari adventures to township cultural tours, discover the soul of South Africa.",
    featured: true,
    highlights: ["Safari Adventures", "Wine Tours", "Cultural Townships", "Table Mountain"],
    currency: { code: "ZAR", symbol: "R", name: "South African Rand" },
    language: [{ name: "English", code: "en" }, { name: "Afrikaans", code: "af" }],
    capital: "Cape Town",
    timezone: "Africa/Johannesburg",
    population: 60000000,
    climate: "temperate",
    bestTimeToVisit: {
      months: ["April", "May", "September", "October"],
      description: "Mild temperatures and less rainfall"
    },
    visaRequirements: "visa-on-arrival",
    coordinates: { latitude: -30.5595, longitude: 22.9375 }
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    region: "america",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
    cities: "Rio de Janeiro, São Paulo, Salvador",
    experiencesCount: 95,
    rating: 4.7,
    reviewsCount: 890,
    description: "Immerse yourself in the rhythms of samba, flavors of Bahia, and wonders of the rainforest.",
    featured: false,
    highlights: ["Amazon Rainforest", "Samba Culture", "Christ the Redeemer", "Carnival"],
    currency: { code: "BRL", symbol: "R$", name: "Brazilian Real" },
    language: [{ name: "Portuguese", code: "pt" }],
    capital: "Brasília",
    timezone: "America/Sao_Paulo",
    population: 215000000,
    climate: "tropical",
    bestTimeToVisit: {
      months: ["April", "May", "September", "October"],
      description: "Dry season with pleasant temperatures"
    },
    visaRequirements: "visa-required",
    coordinates: { latitude: -14.2350, longitude: -51.9253 }
  },
  {
    name: "India",
    flag: "🇮🇳",
    region: "asia",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    cities: "Delhi, Mumbai, Kolkata, Chennai",
    experiencesCount: 150,
    rating: 4.9,
    reviewsCount: 1500,
    description: "From Himalayan treks to Kerala backwaters, discover India's rich tapestry of cultures.",
    featured: true,
    highlights: ["Taj Mahal", "Kerala Backwaters", "Himalayan Treks", "Spiritual Tours"],
    currency: { code: "INR", symbol: "₹", name: "Indian Rupee" },
    language: [{ name: "Hindi", code: "hi" }, { name: "English", code: "en" }],
    capital: "New Delhi",
    timezone: "Asia/Kolkata",
    population: 1400000000,
    climate: "tropical",
    bestTimeToVisit: {
      months: ["October", "November", "December", "January", "February", "March"],
      description: "Cool and dry weather"
    },
    visaRequirements: "e-visa",
    coordinates: { latitude: 20.5937, longitude: 78.9629 }
  },
  {
    name: "China",
    flag: "🇨🇳",
    region: "asia",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d",
    cities: "Beijing, Shanghai, Xi'an, Shenzhen",
    experiencesCount: 180,
    rating: 4.6,
    reviewsCount: 2100,
    description: "Explore ancient dynasties and modern marvels in the world's most populous nation.",
    featured: false,
    highlights: ["Great Wall", "Forbidden City", "Terracotta Army", "Modern Shanghai"],
    currency: { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    language: [{ name: "Mandarin", code: "zh" }],
    capital: "Beijing",
    timezone: "Asia/Shanghai",
    population: 1440000000,
    climate: "continental",
    bestTimeToVisit: {
      months: ["April", "May", "September", "October"],
      description: "Mild temperatures and clear skies"
    },
    visaRequirements: "visa-required",
    coordinates: { latitude: 35.8617, longitude: 104.1954 }
  },
  {
    name: "United States",
    flag: "🇺🇸",
    region: "america",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74",
    cities: "New York, Los Angeles, Chicago, Miami",
    experiencesCount: 200,
    rating: 4.5,
    reviewsCount: 3200,
    description: "From bustling cities to national parks, experience the diversity of America.",
    featured: true,
    highlights: ["Grand Canyon", "Statue of Liberty", "Yellowstone", "Hollywood"],
    currency: { code: "USD", symbol: "$", name: "US Dollar" },
    language: [{ name: "English", code: "en" }],
    capital: "Washington D.C.",
    timezone: "America/New_York",
    population: 331000000,
    climate: "temperate",
    bestTimeToVisit: {
      months: ["April", "May", "June", "September", "October"],
      description: "Pleasant weather across most regions"
    },
    visaRequirements: "visa-required",
    coordinates: { latitude: 37.0902, longitude: -95.7129 }
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    region: "asia",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    cities: "Tokyo, Osaka, Kyoto, Hiroshima",
    experiencesCount: 140,
    rating: 4.8,
    reviewsCount: 1800,
    description: "Blend ancient traditions with cutting-edge technology in the Land of the Rising Sun.",
    featured: true,
    highlights: ["Mount Fuji", "Cherry Blossoms", "Traditional Temples", "Sushi Culture"],
    currency: { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    language: [{ name: "Japanese", code: "ja" }],
    capital: "Tokyo",
    timezone: "Asia/Tokyo",
    population: 125000000,
    climate: "temperate",
    bestTimeToVisit: {
      months: ["March", "April", "May", "October", "November"],
      description: "Cherry blossom season and autumn colors"
    },
    visaRequirements: "visa-free",
    coordinates: { latitude: 36.2048, longitude: 138.2529 }
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    region: "oceania",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    cities: "Sydney, Melbourne, Brisbane, Perth",
    experiencesCount: 110,
    rating: 4.7,
    reviewsCount: 1400,
    description: "Discover unique wildlife, stunning landscapes, and vibrant cities Down Under.",
    featured: false,
    highlights: ["Great Barrier Reef", "Sydney Opera House", "Outback Adventures", "Unique Wildlife"],
    currency: { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    language: [{ name: "English", code: "en" }],
    capital: "Canberra",
    timezone: "Australia/Sydney",
    population: 25700000,
    climate: "temperate",
    bestTimeToVisit: {
      months: ["March", "April", "May", "September", "October", "November"],
      description: "Mild temperatures and less rainfall"
    },
    visaRequirements: "e-visa",
    coordinates: { latitude: -25.2744, longitude: 133.7751 }
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    region: "europe",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
    cities: "Berlin, Munich, Hamburg, Frankfurt",
    experiencesCount: 85,
    rating: 4.6,
    reviewsCount: 1100,
    description: "Experience rich history, cultural diversity, and modern innovation in the heart of Europe.",
    featured: false,
    highlights: ["Brandenburg Gate", "Neuschwanstein Castle", "Oktoberfest", "Christmas Markets"],
    currency: { code: "EUR", symbol: "€", name: "Euro" },
    language: [{ name: "German", code: "de" }],
    capital: "Berlin",
    timezone: "Europe/Berlin",
    population: 83200000,
    climate: "temperate",
    bestTimeToVisit: {
      months: ["May", "June", "July", "August", "September"],
      description: "Warm weather and long daylight hours"
    },
    visaRequirements: "visa-free",
    coordinates: { latitude: 51.1657, longitude: 10.4515 }
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing countries
    await Country.deleteMany({});
    console.log('Cleared existing countries');

    // Insert new countries
    const createdCountries = await Country.insertMany(g20Countries);
    console.log(`Seeded ${createdCountries.length} countries`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

// Run the seeding script
seedDatabase();
