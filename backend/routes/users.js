const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/v1/users
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const { role, search, limit = 20, page = 1 } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    if (role) {
      query.role = role;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, 'i') } },
        { email: { $regex: new RegExp(search, 'i') } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const users = await User.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await User.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: users.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        users
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('wishlist')
      .populate('bookings');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Add experience to wishlist
// @route   POST /api/v1/users/wishlist/:experienceId
// @access  Private
router.post('/wishlist/:experienceId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.wishlist.includes(req.params.experienceId)) {
      user.wishlist.push(req.params.experienceId);
      await user.save();
    }

    res.status(200).json({
      status: 'success',
      message: 'Experience added to wishlist',
      data: {
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Remove experience from wishlist
// @route   DELETE /api/v1/users/wishlist/:experienceId
// @access  Private
router.delete('/wishlist/:experienceId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.experienceId
    );
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Experience removed from wishlist',
      data: {
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Get user's wishlist
// @route   GET /api/v1/users/wishlist
// @access  Private
router.get('/wishlist/list', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'wishlist',
        populate: {
          path: 'country',
          select: 'name flag region'
        }
      });

    res.status(200).json({
      status: 'success',
      results: user.wishlist.length,
      data: {
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Add visited country
// @route   POST /api/v1/users/visited-countries
// @access  Private
router.post('/visited-countries', auth, async (req, res) => {
  try {
    const { country, visitDate, rating } = req.body;
    const user = await User.findById(req.user._id);
    
    // Check if country already exists in visited countries
    const existingVisit = user.visitedCountries.find(
      visit => visit.country === country
    );
    
    if (existingVisit) {
      // Update existing visit
      existingVisit.visitDate = visitDate || existingVisit.visitDate;
      existingVisit.rating = rating || existingVisit.rating;
    } else {
      // Add new visit
      user.visitedCountries.push({
        country,
        visitDate: visitDate || new Date(),
        rating
      });
    }
    
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Visited country added successfully',
      data: {
        visitedCountries: user.visitedCountries
      }
    });
  } catch (error) {
    console.error('Add visited country error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

// @desc    Update user preferences
// @route   PUT /api/v1/users/preferences
// @access  Private
router.put('/preferences', auth, async (req, res) => {
  try {
    const { interests } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { interests },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Preferences updated successfully',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
