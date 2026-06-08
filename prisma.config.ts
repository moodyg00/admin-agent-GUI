/**
 * Prisma 7 config for admin-agent — shares the same Postgres DB as proto-2.
 * Loads .env.local (or .env) for DATABASE_URL.
 * Connection URL lives here (not in schema.prisma).
 *
 * docs: https://pris.ly/d/config-datasource
 */
import fs from 'node:fs';
import path from 'node:path';

import dotenv from 'dotenv';
import { defineConfig } from 'prisma/config';

for (const envPath of [path.resolve(process.cwd(), '.env.local'), path.resolve(process.cwd(), '.env')]) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? process.env.SUPABASE_DB_URL ?? process.env.SUPABASE_POOLER_URL ?? '',
  },
});
