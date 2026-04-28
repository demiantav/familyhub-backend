import { PrismaClient } from '../../prisma/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '../core/config/env.js';

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
