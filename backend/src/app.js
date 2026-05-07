const express = require('express');
const cors = require('cors');
const { summarize } = require('./controllers/summarizerController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/userRouter'));
app.use('/api/meetings', require('./routes/meetingRouter'));
app.use('/api/transcripts', require('./routes/transcriptRouter'));
app.use('/api/summary', require('./routes/summaryRouter'));

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Google Meet Summarizer API is running' });
});

// Standalone summarize endpoint (retained from original index.js)
app.post('/api/summarize', summarize);

module.exports = app;
