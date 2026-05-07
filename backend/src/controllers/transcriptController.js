const Meeting = require('../models/meetingModel');
const Summary = require('../models/summaryModel');
const { generateSummary } = require('../services/aiService');

/**
 * Process a standalone transcript
 */
const processTranscript = async (req, res) => {
  try {
    const { transcript, summaryLength = 'medium' } = req.body;
    
    if (!transcript || transcript.trim().length === 0) {
      return res.status(400).json({ error: 'No transcript provided' });
    }
    
    const result = await generateSummary(transcript, summaryLength);
    
    return res.json({
      success: true,
      ...result,
      processedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing transcript:', error);
    return res.status(500).json({
      error: 'Failed to process transcript',
      details: error.message
    });
  }
};

/**
 * Process transcript for a specific meeting
 */
const processMeetingTranscript = async (req, res) => {
  try {
    const { transcript, summaryLength = 'medium' } = req.body;
    const { meetingId } = req.params;
    
    if (!transcript || transcript.trim().length === 0) {
      return res.status(400).json({ error: 'No transcript provided' });
    }
    
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    
    // Check permission
    if (meeting.organizer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this meeting' });
    }
    
    // Generate AI Summary
    const aiResult = await generateSummary(transcript, summaryLength);
    
    // Update meeting
    meeting.transcript = {
      raw: transcript,
      processedAt: new Date()
    };
    meeting.summary = {
      text: aiResult.summary,
      keyPoints: aiResult.keyPoints,
      actionItems: aiResult.actionItems,
      decisions: aiResult.decisions,
      generatedAt: new Date()
    };
    
    await meeting.save();
    
    // Save to Summary record
    const newSummary = new Summary({
      meetingId: meeting._id,
      content: aiResult.summary,
      keyPoints: aiResult.keyPoints,
      decisions: aiResult.decisions,
      actionItems: aiResult.actionItems.map(item => ({ description: item })),
      summaryType: summaryLength,
      aiMetadata: aiResult.aiMetadata,
      createdBy: req.user.id
    });
    
    await newSummary.save();
    
    return res.json({
      success: true,
      meetingId: meeting._id,
      summary: newSummary
    });
  } catch (error) {
    console.error('Error processing meeting transcript:', error);
    return res.status(500).json({
      error: 'Failed to process meeting transcript',
      details: error.message
    });
  }
};

module.exports = {
  processTranscript,
  processMeetingTranscript
};
