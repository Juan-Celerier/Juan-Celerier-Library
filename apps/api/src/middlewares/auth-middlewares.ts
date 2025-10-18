import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createDomainError } from "./error-handler.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // ⚡️ asignamos user a req gracias a la extensión de tipos
    req.user = decoded as any; // <- si querés, después refinamos el tipo

    next();
  } catch {
    next(createDomainError("Invalid token"));
  }
};
