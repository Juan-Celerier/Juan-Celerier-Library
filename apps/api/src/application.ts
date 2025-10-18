// apps/api/src/application.ts
import type { Express } from "express";
import { initializeDatabase, closeDatabaseConnection } from "./config/data.js";

export interface ApplicationDependencies {
  app: Express;
  port: number;
  environment?: string;
}

export interface Application {
  start(): Promise<void>;
  stop(): Promise<void>;
}

export function createApplication({
  app,
  port,
  environment = "development",
}: ApplicationDependencies): Application {
  return {
    async start() {
      await initializeDatabase();
      app.listen(port, () => {
        console.log(`🚀 BookLend API listening on port ${port}`);
        console.log(`📚 Environment: ${environment}`);
      });
    },

    async stop() {
      console.log("🛑 Shutting down gracefully...");
      await closeDatabaseConnection();
      console.log("✅ Application stopped successfully");
    },
  };
}
