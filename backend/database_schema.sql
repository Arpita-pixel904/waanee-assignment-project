-- 1. Users Table
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) UNIQUE NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(20) CHECK ("role" IN ('ADMIN', 'MANAGER', 'AGENT')) DEFAULT 'AGENT',
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Leads Table
CREATE TABLE IF NOT EXISTS "leads" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "phone" VARCHAR(20),
    "source" VARCHAR(50),
    "status" VARCHAR(50) DEFAULT 'NEW',
    "notes" TEXT,
    "assigned_to" INTEGER REFERENCES "users"("id") ON DELETE SET NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Activity Logs Table
CREATE TABLE IF NOT EXISTS "activity_logs" (
    "id" SERIAL PRIMARY KEY,
    "lead_id" INTEGER REFERENCES "leads"("id") ON DELETE CASCADE,
    "performed_by" INTEGER REFERENCES "users"("id") ON DELETE SET NULL,
    "action_type" VARCHAR(100) NOT NULL,
    "details" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Assignment Metadata (For Round-Robin tracking)
CREATE TABLE IF NOT EXISTS "assignment_metadata" (
    "key" VARCHAR(50) PRIMARY KEY,
    "last_assigned_agent_id" INTEGER REFERENCES "users"("id")
);