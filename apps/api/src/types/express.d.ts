// apps/api/src/types/express.d.ts
import type { User } from "domain/src/entities/User.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
