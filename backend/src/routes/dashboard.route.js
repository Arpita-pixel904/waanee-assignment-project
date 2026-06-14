import express from "express";

import {
  getDashboardStats
} from "../controllers/dashboard.controller.js";

import {
  authenticateToken
} from "../middleware/auth.middleware.js";

const dashboardRoutes =
  express.Router();

dashboardRoutes.get(
  "/stats",
  authenticateToken,
  getDashboardStats
);

export default dashboardRoutes;