const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getMeetings, createMeeting, getMeetingById } = require('../controllers/meetingController');

// @route   GET api/meetings
// @desc    Get all user meetings
router.get('/', auth, getMeetings);

// @route   POST api/meetings
// @desc    Create a meeting
router.post('/', auth, createMeeting);

// @route   GET api/meetings/:id
// @desc    Get meeting by ID
router.get('/:id', auth, getMeetingById);

module.exports = router;