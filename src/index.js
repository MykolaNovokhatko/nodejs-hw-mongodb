import 'dotenv/config';
import setupServer from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import './models/contact.js';

const app = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error(error);
  }
};

app();
