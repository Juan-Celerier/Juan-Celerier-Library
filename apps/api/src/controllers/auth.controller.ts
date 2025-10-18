// apps/api/src/controllers/auth.controller.ts
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthService } from "domain/src/services/auth-service.js";
import type { CryptoService } from "domain/src/services/crypto-service.js";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
import type { User } from "domain/src/entities/User.js";

export const authController = (
  authService: AuthService,
  cryptoService: CryptoService
) => ({
  register: asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name)
      throw createDomainError("Missing registration fields");

    const hashedPassword = await cryptoService.hashPassword(password);

    const user = await authService.createUser({
      email,
      name,
      role,
      hashedPassword,
    });

    res
      .status(201)
      .json({
        success: true,
        data: user,
        message: "User registered",
        timestamp: new Date().toISOString(),
      });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password)
      throw createDomainError("Email and password are required");

    const user = await authService.findByEmail(email);
    if (!user) throw createDomainError("Invalid email or password");

    const valid = await cryptoService.comparePassword(
      password,
      (user as any).hashedPassword
    );
    if (!valid) throw createDomainError("Invalid email or password");

    const token = jwt.sign(
      {
        id: (user as any).id,
        email: (user as any).email,
        role: (user as any).role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      data: { token, user },
      message: "Login successful",
      timestamp: new Date().toISOString(),
    });
  }),

  getProfile: asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as unknown as User | undefined;
    if (!user) throw createDomainError("User not authenticated");
    res.json({
      success: true,
      data: user,
      message: "Profile retrieved",
      timestamp: new Date().toISOString(),
    });
  }),
});
