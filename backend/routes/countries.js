const express = require('express');
const Country = require('../models/Country');

const router = express.Router();

// @desc    Get all countries
// @route   GET /api/v1/countries
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { region, featured, search, limit = 20, page = 1 } = req.query;
    
    // Build query
    let query = {};
    
    if (region) {
      query.region = region;
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
    let countries = await Country.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort(search ? { score: { $meta: 'textScore' } } : { name: 1 });

    // Get total count for pagination
    const total = await Country.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: countries.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        countries
      }
    });
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Get single country
// @route   GET /api/v1/countries/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);

    if (!country) {
      return res.status(404).json({
        status: 'error',
        message: 'Country not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        country
      }
    });
  } catch (error) {
    console.error('Get country error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Get country by name
// @route   GET /api/v1/countries/name/:name
// @access  Public
router.get('/name/:name', async (req, res) => {
  try {
    const country = await Country.findOne({ 
      name: { $regex: new RegExp(req.params.name, 'i') }
    });

    if (!country) {
      return res.status(404).json({
        status: 'error',
        message: 'Country not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        country
      }
    });
  } catch (error) {
    console.error('Get country by name error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Get countries by region
// @route   GET /api/v1/countries/region/:region
// @access  Public
router.get('/region/:region', async (req, res) => {
  try {
    const countries = await Country.find({ region: req.params.region })
      .sort({ name: 1 });

    res.status(200).json({
      status: 'success',
      results: countries.length,
      data: {
        countries
      }
    });
  } catch (error) {
    console.error('Get countries by region error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Create new country (Admin only)
// @route   POST /api/v1/countries
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    const country = await Country.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Country created successfully',
      data: {
        country
      }
    });
  } catch (error) {
    console.error('Create country error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Update country (Admin only)
// @route   PUT /api/v1/countries/:id
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!country) {
      return res.status(404).json({
        status: 'error',
        message: 'Country not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Country updated successfully',
      data: {
        country
      }
    });
  } catch (error) {
    console.error('Update country error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Delete country (Admin only)
// @route   DELETE /api/v1/countries/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);

    if (!country) {
      return res.status(404).json({
        status: 'error',
        message: 'Country not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Country deleted successfully'
    });
  } catch (error) {
    console.error('Delete country error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
