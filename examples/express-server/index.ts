import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';

const app = express();
// app.use(cors());
// app.use(bodyParser.json());

async function startServer() {
  // const authModule = await import('../../server/authRoutes.js');
  // const authRoutes = authModule.default as unknown as Router;

  const { connectDB } = await import('../../db/connection.js');

  // app.use('/webauthn', authRoutes);

  await connectDB();
  app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
}

startServer();
