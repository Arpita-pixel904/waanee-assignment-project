This `README.md` and `AI_USAGE.md` are professionally structured to meet the assessment's documentation requirements.

### 1. README.md

Create this file in your root project folder.

```markdown
# Mini Lead Management System

A full-stack Lead Management System built with Node.js, Express, Prisma (PostgreSQL), and React.

## Features
- **Authentication**: JWT-based secure login/registration with role-based access control (Admin, Manager, Agent).
- **Lead Management**: Complete CRUD operations for leads with pagination, filtering, and sorting.
- **Round-Robin Assignment**: Automated lead assignment logic for efficient workload distribution.
- **Activity Logging**: Automated tracking of all lead interactions.
- **External API Integration**: Mock third-party webhook integration for lead notifications.

## Architecture


## Prerequisites
- Node.js (v20+)
- PostgreSQL (or Supabase instance)
- npm or yarn

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="supersecretkey"
   JWT_EXPIRES_IN="1d"
   PORT=5000

```

4. `npx prisma migrate dev`
5. `npm run dev`

### Frontend

1. `cd frontend`
2. `npm install`
3. Create a `.env` file:
```env
VITE_API_URL="http://localhost:5000/api"

```


4. `npm run dev`

## API Documentation

* `POST /api/auth/register` - Create new account
* `POST /api/auth/login` - Authenticate & receive token
* `GET /api/leads` - Fetch leads (Supports pagination & status filter)
* `POST /api/leads` - Create lead (Admin/Manager only)

## Assumptions & Tradeoffs

* **Assumptions**: Users are pre-populated or registered by Admin.
* **Tradeoffs**: Dashboard statistics are calculated client-side to keep the initial API simple; for datasets > 10,000 records, I would implement a dedicated SQL aggregation endpoint to improve performance.

```

