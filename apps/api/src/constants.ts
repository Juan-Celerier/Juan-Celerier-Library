// apps/api/src/constants.ts
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const NODE_ENV = process.env.NODE_ENV || "development";
