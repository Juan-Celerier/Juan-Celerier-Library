// api/src/config/data.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { fileURLToPath } from "url";
import { entities } from "../entities/index.js"; // <-- import centralizado de todas las entidades

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: path.join(process.cwd(), "data", "library-system.sqlite"),
  entities: entities, // <-- todas las entidades desde index.ts
  migrations: [path.join(__dirname, "../migrations/*.ts")],
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
});

export async function initializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log("✅ Database initialized");
  }
}

export async function closeDatabaseConnection() {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("✅ Database connection closed");
  }
}
