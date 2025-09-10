const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Country name is required'],
    unique: true,
    trim: true
  },
  flag: {
    type: String,
    required: [true, 'Country flag emoji is required']
  },
  region: {
    type: String,
    required: [true, 'Region is required'],
    enum: ['africa', 'america', 'asia', 'europe', 'oceania']
  },
  image: {
    type: String,
    required: [true, 'Country image URL is required']
  },
  cities: {
    type: String,
    required: [true, 'Major cities are required']
  },
  experiencesCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Country description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  featured: {
    type: Boolean,
    default: false
  },
  highlights: [{
    type: String,
    required: true
  }],
  currency: {
    code: String,
    symbol: String,
    name: String
  },
  language: [{
    name: String,
    code: String
  }],
  timezone: {
    type: String
  },
  capital: {
    type: String
  },
  population: {
    type: Number
  },
  climate: {
    type: String,
    enum: ['tropical', 'temperate', 'arid', 'continental', 'mediterranean', 'polar']
  },
  bestTimeToVisit: {
    months: [String],
    description: String
  },
  visaRequirements: {
    type: String,
    enum: ['visa-free', 'visa-on-arrival', 'e-visa', 'visa-required']
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
countrySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for geospatial queries
countrySchema.index({ coordinates: '2dsphere' });

// Index for text search
countrySchema.index({ 
  name: 'text', 
  description: 'text', 
  cities: 'text',
  highlights: 'text'
});

module.exports = mongoose.model('Country', countrySchema);
