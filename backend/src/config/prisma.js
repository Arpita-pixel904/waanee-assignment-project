// backend/src/config/prisma.js
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Initialize the raw pg connection pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Create the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to PrismaClient
const prisma = new PrismaClient({ adapter });

export default prisma;