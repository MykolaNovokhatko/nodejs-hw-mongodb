import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function initMongoConnection() {
  const { DB_URI } = process.env;
  
  if (!DB_URI) {
    console.error('DB_URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

export { initMongoConnection };
