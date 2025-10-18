// apps/api/src/types/express/index.d.ts
import "express";
import { User } from "domain/src/entities/User.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
