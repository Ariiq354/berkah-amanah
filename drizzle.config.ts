import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
