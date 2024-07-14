import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function initMongoConnection() {

    const DB_URI = process.env.DB_URI;

  try {
    // console.log({DB_URI});
    await mongoose.connect(DB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export { initMongoConnection };
