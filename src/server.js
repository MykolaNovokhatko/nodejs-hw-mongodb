import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pino from 'pino';
import contactsRouter from './routes/contacts.js';

const logger = pino();
const pinoMiddlewar = pinoHttp({ logger });

export default function setupServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(pinoMiddlewar);

  app.use('/contacts', contactsRouter);

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}