const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summarySchema = new Schema({
  meetingId: {
    type: Schema.Types.ObjectId,
    ref: 'Meeting',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  keyPoints: [{
    type: String
  }],
  decisions: [{
    type: String
  }],
  actionItems: [{
    description: String,
    assignedTo: String,
    dueDate: Date
  }],
  summaryType: {
    type: String,
    enum: ['short', 'medium', 'long'],
    default: 'medium'
  },
  aiMetadata: {
    modelUsed: {
      type: String,
      default: 'gemini-pro'
    },
    processingTime: Number
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Summary', summarySchema);