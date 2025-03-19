import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_bJtUQiu7XKh3@ep-restless-mode-a50f826j-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
} satisfies Config;
