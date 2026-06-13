import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './src/routes/authRoutes.js';
import leadRoutes from './src/routes/leadRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.send('Mini Lead Management API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});