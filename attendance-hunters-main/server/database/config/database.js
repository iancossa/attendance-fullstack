const { Pool } = require('pg');
const { PrismaClient } = require('../generated/prisma');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const prisma = new PrismaClient();

module.exports = { pool, prisma };