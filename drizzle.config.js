/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:IFBxDdC3f1RJ@ep-tight-forest-a5nh3lk8.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };