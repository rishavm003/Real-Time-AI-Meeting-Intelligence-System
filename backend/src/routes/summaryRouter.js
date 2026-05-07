const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getMeetingSummaries, getSummaryById, deleteSummary } = require('../controllers/summaryController');

// @route   GET api/summary/meeting/:meetingId
router.get('/meeting/:meetingId', auth, getMeetingSummaries);

// @route   GET api/summary/:id
router.get('/:id', auth, getSummaryById);

// @route   DELETE api/summary/:id
router.delete('/:id', auth, deleteSummary);

module.exports = router;