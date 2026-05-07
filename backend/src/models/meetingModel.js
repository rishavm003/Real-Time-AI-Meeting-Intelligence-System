const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Main schema for meeting data
const meetingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  meetId: {
    type: String,
    required: false, // Optional for now
    index: true
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  participants: [{
    type: String,
    trim: true
  }],
  transcript: {
    raw: { type: String },
    processedAt: { type: Date }
  },
  summary: {
    text: { type: String, trim: true },
    keyPoints: [String],
    actionItems: [String],
    decisions: [String],
    generatedAt: { type: Date }
  },
  notes: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Meeting', meetingSchema);