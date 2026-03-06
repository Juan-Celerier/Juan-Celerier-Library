import { Request, Response } from "express";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
import { AppDataSource } from "../config/data.js";
import { CategoryEntity } from "../entities/category.entity.js";

const categoryRepository = AppDataSource.getRepository(CategoryEntity);

export const categoryController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const categories = await categoryRepository.find({ relations: ["books"] });
    if (!categories.length) throw createDomainError("No categories found");
    res.json({
      success: true,
      data: categories,
      message: "Categories retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await categoryRepository.findOne({
      where: { id },
      relations: ["books"],
    });
    if (!category) throw createDomainError("Category not found");
    res.json({
      success: true,
      data: category,
      message: "Category retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) throw createDomainError("Category name is required");
    const category = categoryRepository.create({ name });
    await categoryRepository.save(category);
    res.status(201).json({
      success: true,
      data: category,
      message: "Category created",
      timestamp: new Date().toISOString(),
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await categoryRepository.findOneBy({ id });
    if (!category) throw createDomainError("Category not found");
    await categoryRepository.remove(category);
    res.json({
      success: true,
      message: "Category deleted",
      timestamp: new Date().toISOString(),
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryRepository.findOneBy({ id });
    if (!category) throw createDomainError("Category not found");
    category.name = name;
    await categoryRepository.save(category);
    res.json({
      success: true,
      data: category,
      message: "Category updated",
      timestamp: new Date().toISOString(),
    });
  }),
};
