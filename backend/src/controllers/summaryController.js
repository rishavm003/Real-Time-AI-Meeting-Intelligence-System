const Summary = require('../models/summaryModel');

/**
 * Get all summaries for a meeting
 */
const getMeetingSummaries = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const summaries = await Summary.find({ meetingId }).sort({ createdAt: -1 });
    res.json(summaries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get a specific summary by ID
 */
const getSummaryById = async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id);
    if (!summary) return res.status(404).json({ message: 'Summary not found' });
    res.json(summary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Delete a summary
 */
const deleteSummary = async (req, res) => {
  try {
    const summary = await Summary.findById(req.params.id);
    if (!summary) return res.status(404).json({ message: 'Summary not found' });
    
    // Check ownership (if creator is tracked)
    if (summary.createdBy && summary.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await summary.deleteOne();
    res.json({ message: 'Summary removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getMeetingSummaries,
  getSummaryById,
  deleteSummary
};
