const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { processTranscript, processMeetingTranscript } = require('../controllers/transcriptController');

// @route   POST api/transcripts/process
// @desc    Process a transcript (standalone)
router.post('/process', processTranscript);

// @route   POST api/transcripts/meeting/:meetingId
// @desc    Process transcript and associate with meeting
router.post('/meeting/:meetingId', auth, processMeetingTranscript);

module.exports = router;