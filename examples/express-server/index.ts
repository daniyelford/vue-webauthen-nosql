import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from '../../server/authRoutes';
import { connectDB } from '../../db/mongoAdapter';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/webauthn', authRoutes);

const PORT = 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Example server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Failed to connect DB', err));
