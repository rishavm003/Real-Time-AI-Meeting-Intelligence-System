require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Google Meet Summarizer server running on port ${PORT}`);
});
