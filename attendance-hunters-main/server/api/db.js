const { PrismaClient } = require('../database/generated/prisma');

const prisma = new PrismaClient();

module.exports = prisma;