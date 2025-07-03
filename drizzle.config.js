import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "src/configs/schema.js",
  dbCredentials:{
    url:NEXT_PUBLIC_DATABASE_CONNECTION_STRING="postgresql://Ai-content-generator_owner:ZtoHcJ4fv5Ya@ep-empty-dawn-a5fk4ufj.us-east-2.aws.neon.tech/Ai-content-generator?sslmode=require"
  }
});