const express = require('express');
const Experience = require('../models/Experience');

const router = express.Router();

// @desc    Get all experiences
// @route   GET /api/v1/experiences
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      country, 
      category, 
      city, 
      minPrice, 
      maxPrice, 
      difficulty, 
      featured, 
      search,
      sort = '-rating.average',
      limit = 20, 
      page = 1 
    } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    if (country) {
      query.country = country;
    }
    
    if (category) {
      query.category = category;
    }
    
    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }
    
    if (minPrice || maxPrice) {
      query['price.amount'] = {};
      if (minPrice) query['price.amount'].$gte = parseFloat(minPrice);
      if (maxPrice) query['price.amount'].$lte = parseFloat(maxPrice);
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    let experiences = await Experience.find(query)
      .populate('country', 'name flag region')
      .populate('guide', 'name avatar rating')
      .skip(skip)
      .limit(parseInt(limit))
      .sort(search ? { score: { $meta: 'textScore' } } : sort);

    // Get total count for pagination
    const total = await Experience.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: experiences.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        experiences
      }
    });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Get single experience
// @route   GET /api/v1/experiences/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate('country', 'name flag region currency timezone')
      .populate('guide', 'name avatar rating reviews')
      .populate('reviews');

    if (!experience) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Get experiences by country
// @route   GET /api/v1/experiences/country/:countryId
// @access  Public
router.get('/country/:countryId', async (req, res) => {
  try {
    const { category, limit = 10 } = req.query;
    
    let query = { 
      country: req.params.countryId,
      isActive: true
    };
    
    if (category) {
      query.category = category;
    }

    const experiences = await Experience.find(query)
      .populate('country', 'name flag')
      .limit(parseInt(limit))
      .sort('-rating.average');

    res.status(200).json({
      status: 'success',
      results: experiences.length,
      data: {
        experiences
      }
    });
  } catch (error) {
    console.error('Get experiences by country error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Get featured experiences
// @route   GET /api/v1/experiences/featured
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const experiences = await Experience.find({ 
      featured: true, 
      isActive: true 
    })
      .populate('country', 'name flag region')
      .limit(parseInt(limit))
      .sort('-rating.average');

    res.status(200).json({
      status: 'success',
      results: experiences.length,
      data: {
        experiences
      }
    });
  } catch (error) {
    console.error('Get featured experiences error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Search experiences near location
// @route   GET /api/v1/experiences/near
// @access  Public
router.get('/near/search', async (req, res) => {
  try {
    const { lat, lng, maxDistance = 50000, limit = 10 } = req.query; // maxDistance in meters

    if (!lat || !lng) {
      return res.status(400).json({
        status: 'error',
        message: 'Latitude and longitude are required'
      });
    }

    const experiences = await Experience.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      },
      isActive: true
    })
      .populate('country', 'name flag')
      .limit(parseInt(limit));

    res.status(200).json({
      status: 'success',
      results: experiences.length,
      data: {
        experiences
      }
    });
  } catch (error) {
    console.error('Search near experiences error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Create new experience
// @route   POST /api/v1/experiences
// @access  Private
router.post('/', async (req, res) => {
  try {
    const experience = await Experience.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Experience created successfully',
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Update experience
// @route   PUT /api/v1/experiences/:id
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Experience updated successfully',
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Delete experience
// @route   DELETE /api/v1/experiences/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
