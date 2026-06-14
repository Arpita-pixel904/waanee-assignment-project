# Mini Lead Management System

## Overview

Mini Lead Management System is a full-stack web application built using:

* React.js
* Node.js
* Express.js
* PostgreSQL
* JWT Authentication

The system allows managers to create leads, automatically assign them to agents, track lead status, and maintain activity logs.

---

## Features

### Authentication

* Register User
* Login User
* JWT Authentication
* Role Based Authorization
* Protected Routes

Supported Roles:

* ADMIN
* MANAGER
* AGENT

---

### Lead Management

* Create Lead
* Update Lead
* Delete Lead
* Get Lead By Id
* List Leads

Additional Features:

* Search
* Pagination
* Sorting
* Status Filter
* Source Filter

---

### Lead Assignment

When a Manager creates a lead:

* Lead is automatically assigned to an available Agent

Current implementation:

* Round Robin (simplified by selecting available agent)

---

### Activity Logs

Tracks:

* Lead Created
* Lead Updated
* Lead Assigned
* Status Changed

---

### Dashboard

Displays:

* Total Leads
* New Leads
* Contacted Leads
* Qualified Leads
* Closed Leads

---

## Project Structure

### Backend

backend/

* routes/
* controllers/
* services/
* repositories/
* middleware/
* utils/
* database/

### Frontend

frontend/

* pages/
* components/
* services/
* routes/
* layouts/

---

## Environment Variables

Backend (.env)

DB_HOST=localhost

DB_PORT=5432

DB_NAME=lead_management_system

DB_USER=root

DB_PASSWORD=my-password

PORT=3000

JWT_SECRET=your-secret-key

ACCESS_TOKEN_EXPIRY=15m

---

## Database Setup

Run PostgreSQL using Docker:

docker compose up -d

Run SQL schema:

schema.sql

---

## Backend Setup

npm install

npm run dev

Runs on:

http://localhost:3000

---

## Frontend Setup

npm install

npm run dev

Runs on:

http://localhost:5173

---

## API Documentation

Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

---

Leads

POST /api/leads

GET /api/leads

GET /api/leads/:id

PUT /api/leads/:id

DELETE /api/leads/:id

PATCH /api/leads/:id/assign

PATCH /api/leads/:id/status

---

Dashboard

GET /api/dashboard/stats

---

Activity Logs

GET /api/activity-logs

---

## Assumptions

* Managers create leads.
* Managers can manually reassign leads.
* Admin has full access.
* Agent can view assigned leads.
* JWT token is stored in localStorage.

---

## Tradeoffs

* Refresh token flow omitted for simplicity.
* Basic auto-assignment implemented.
* Activity logs stored directly in PostgreSQL.
* Bootstrap used instead of a custom design system.

---

## Future Improvements

* Refresh Token Rotation
* Redis Caching
* Email Notifications
* Background Jobs
* Swagger Documentation
* Unit Testing
* Deployment Pipeline
