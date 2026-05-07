const Meeting = require('../models/meetingModel');

/**
 * Get all meetings for current user
 */
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ organizer: req.user.id }).sort({ startTime: -1 });
    res.json(meetings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Create a new meeting record
 */
const createMeeting = async (req, res) => {
  try {
    const { title, participants, startTime } = req.body;
    const newMeeting = new Meeting({
      title,
      participants,
      startTime,
      organizer: req.user.id
    });

    const meeting = await newMeeting.save();
    res.json(meeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get meeting by ID
 */
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    
    // Check ownership
    if (meeting.organizer.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(meeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getMeetings,
  createMeeting,
  getMeetingById
};
