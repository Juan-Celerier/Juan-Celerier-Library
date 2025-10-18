import { Request, Response } from "express";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
import { AppDataSource } from "../config/data.js";
import { UserEntity } from "../entities/user.entity.js";

const userRepository = AppDataSource.getRepository(UserEntity);

export const userController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const users = await userRepository.find({
      relations: ["loans", "reservations"],
    });
    if (!users.length) throw createDomainError("No users found");
    res.json({
      success: true,
      data: users,
      message: "Users retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userRepository.findOne({
      where: { id },
      relations: ["loans", "reservations"],
    });
    if (!user) throw createDomainError("User not found");
    res.json({
      success: true,
      data: user,
      message: "User retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { name, email, role } = req.body;
    if (!name || !email)
      throw createDomainError("Missing required user fields");
    const user = userRepository.create({ name, email, role: role || "user" });
    await userRepository.save(user);
    res.status(201).json({
      success: true,
      data: user,
      message: "User created",
      timestamp: new Date().toISOString(),
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id });
    if (!user) throw createDomainError("User not found");
    await userRepository.remove(user);
    res.json({
      success: true,
      message: "User deleted",
      timestamp: new Date().toISOString(),
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const user = await userRepository.findOneBy({ id });
    if (!user) throw createDomainError("User not found");
    user.name = name;
    user.email = email;
    user.role = role;
    await userRepository.save(user);
    res.json({
      success: true,
      data: user,
      message: "User updated",
      timestamp: new Date().toISOString(),
    });
  }),
};
