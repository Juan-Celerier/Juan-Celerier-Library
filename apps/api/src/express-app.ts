// apps/api/src/express-app.ts
import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { CLIENT_URL } from "./constants.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { loadRoutes } from "./utils/load-routes.js";

export interface ExpressAppConfig {
  clientUrl?: string;
  enableLogging?: boolean;
  enableCompression?: boolean;
}

export function createExpressApp(config: ExpressAppConfig = {}): Express {
  const {
    clientUrl = CLIENT_URL,
    enableLogging = true,
    enableCompression = true,
  } = config;

  const app = express();

  if (enableLogging) app.use(morgan("dev"));
  if (enableCompression) app.use(compression());

  app.use(cors({ origin: [clientUrl, "http://localhost:5174"], credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "API is running",
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/", (req, res) => {
    res.json({
      message: "BookLend API is running",
      version: "0.0.1",
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api", loadRoutes());
  app.use(errorHandler);

  return app;
}
