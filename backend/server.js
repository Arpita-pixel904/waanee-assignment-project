import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectToDatabase}  from "./src/dbConfig.js";
import authRoutes from './src/routes/auth.routes.js';
import leadRoutes from './src/routes/lead.routes.js';
import userRoutes from './src/routes/user.routes.js';
import activityRoutes from './src/routes/activity.routes.js';
import utilityRoutes from './src/routes/utility.routes.js';
import dashboardRoutes from './src/routes/dashboard.route.js';


// Load environment variables
dotenv.config();

//Database connection
await connectToDatabase()

const app = express();

// Port from .env
const PORT = process.env.PORT || 5000;

// CORS Policy
app.use(
  cors({
    origin: '*', // Replace with frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/utils', utilityRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);

// Sample Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running successfully',
  });
});

// 404 Middleware
app.use((req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started successfully on port ${PORT}`);
});