const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection successful!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

module.exports = connectDB;
