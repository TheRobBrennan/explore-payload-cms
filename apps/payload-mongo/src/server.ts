import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    },
  });

  // Add your own express routes here
  app.get('/api/health', (_, res) => {
    res.status(200).json({ status: 'ok', message: 'Payload CMS with MongoDB is running' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    payload.logger.info(`Server listening on port ${PORT}`);
  });
};

start();
