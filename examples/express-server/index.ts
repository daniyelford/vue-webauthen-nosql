import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from '../../server/authRoutes';
const app = express();
app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  const { connectDB } = await import('../../db/connection.js');

  app.use('/webauthn', router);

  await connectDB();
  app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
}

startServer();
