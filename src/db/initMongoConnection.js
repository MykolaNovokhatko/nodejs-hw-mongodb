import 'dotenv/config';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;
  const DB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

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
