require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

// MongoDB connection
connectDB();

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Note API backend running on http://localhost:${port}`);
});

process.on('SIGTERM', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
