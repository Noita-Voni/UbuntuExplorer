const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Experience title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Experience description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  country: {
    type: mongoose.Schema.ObjectId,
    ref: 'Country',
    required: [true, 'Experience must belong to a country']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['adventure', 'culture', 'food', 'nature', 'history', 'art', 'nightlife', 'spiritual', 'shopping', 'wildlife']
  },
  subcategory: {
    type: String
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['hours', 'days', 'weeks']
    }
  },
  price: {
    amount: {
      type: Number,
      required: [true, 'Price is required']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    priceType: {
      type: String,
      enum: ['per-person', 'per-group', 'per-day'],
      default: 'per-person'
    }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'challenging', 'extreme'],
    default: 'easy'
  },
  groupSize: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 20
    }
  },
  languages: [{
    type: String
  }],
  included: [{
    type: String
  }],
  excluded: [{
    type: String
  }],
  requirements: [{
    type: String
  }],
  cancellationPolicy: {
    type: String,
    default: 'Flexible cancellation up to 24 hours before the experience'
  },
  guide: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5']
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Review'
  }],
  availability: [{
    date: Date,
    slots: Number,
    booked: {
      type: Number,
      default: 0
    }
  }],
  tags: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  bookingCount: {
    type: Number,
    default: 0
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
experienceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for geospatial queries
experienceSchema.index({ location: '2dsphere' });

// Index for text search
experienceSchema.index({ 
  title: 'text', 
  description: 'text', 
  city: 'text',
  tags: 'text'
});

// Compound indexes for common queries
experienceSchema.index({ country: 1, category: 1 });
experienceSchema.index({ featured: -1, rating: -1 });
experienceSchema.index({ price: 1, rating: -1 });

module.exports = mongoose.model('Experience', experienceSchema);
