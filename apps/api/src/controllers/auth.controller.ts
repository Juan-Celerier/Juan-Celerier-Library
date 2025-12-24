// apps/api/src/controllers/auth.controller.ts
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data.js";
import { UserEntity } from "../entities/user.entity.js";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";

const userRepository = AppDataSource.getRepository(UserEntity);

export const authController = () => ({
  register: asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      throw createDomainError("Missing registration fields");

    // Check if user exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) throw createDomainError("User already exists");

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = userRepository.create({
      email,
      name,
      hashedPassword,
      role: "user",
    });

    await userRepository.save(user);

    res.status(201).json({
      success: true,
      data: {
        token: null,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      message: "User registered",
      timestamp: new Date().toISOString(),
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password)
      throw createDomainError("Email and password are required");

    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw createDomainError("Invalid email or password");

    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) throw createDomainError("Invalid email or password");

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      message: "Login successful",
      timestamp: new Date().toISOString(),
    });
  }),

  getProfile: asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) throw createDomainError("User not authenticated");
    res.json({
      success: true,
      data: user,
      message: "Profile retrieved",
      timestamp: new Date().toISOString(),
    });
  }),
});
