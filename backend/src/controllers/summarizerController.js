const { formatConversation } = require('../utils/formatter');
const { generateSummary } = require('../services/aiService');

/**
 * Handle POST /api/summarize
 */
const summarize = async (req, res) => {
  try {
    const captionData = req.body;

    // Validate input
    if (!captionData || !Array.isArray(captionData) || captionData.length === 0) {
      return res.status(400).json({ error: 'Invalid caption data. Please provide an array of caption objects.' });
    }

    // Extract conversation text from captions
    const conversation = formatConversation(captionData);

    // Generate summary using Gemini
    const summary = await generateSummary(conversation);

    // Return the summary
    res.status(200).json({
      summary,
      originalLength: captionData.length,
      processedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing summary request:', error);
    res.status(500).json({
      error: 'Failed to generate summary',
      message: error.message
    });
  }
};

module.exports = {
  summarize
};
