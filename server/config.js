import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const ENVIRONMENT =
  process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "development"
    ? "dev"
    : process.env.NODE_ENV;

// Database connection string values
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_CLUSTER = process.env.DB_CLUSTER;
export const DB_NAME = process.env.DB_NAME;

export const DB_CONNECTION_STRING = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
