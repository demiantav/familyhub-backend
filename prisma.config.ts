import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  // No necesitas redeclarar 'process' si tienes @types/node instalado
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
