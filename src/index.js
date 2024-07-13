import setupServer from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const app = async () => {
  await initMongoConnection();
  setupServer();
};

app();
