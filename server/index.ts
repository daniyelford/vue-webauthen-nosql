// server/index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './authRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err: any) => {
  console.error('Server error:', err);
});
