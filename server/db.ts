import { drizzle } from "drizzle-orm/pg";
import { Pool } from "pg";
import * as schema from "@shared/schema";

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
