import type { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string | number;
        email?: string;
        role: string;
        [key: string]: unknown;
      };
    }
  }
}

export {};
