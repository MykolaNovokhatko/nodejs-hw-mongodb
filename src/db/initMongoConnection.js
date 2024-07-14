import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
  const user = MONGODB_USER;
  const pwd = MONGODB_PASSWORD;
  const url = MONGODB_URL;
  const db = MONGODB_DB;

  const DB_URI = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

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
