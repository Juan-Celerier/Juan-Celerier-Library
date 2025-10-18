// api/src/controllers/author.controller.ts
import { Request, Response } from "express";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
import { AppDataSource } from "../config/data.js";
import { AuthorEntity } from "../entities/author.entity.js";

const authorRepository = AppDataSource.getRepository(AuthorEntity);

export const authorController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const authors = await authorRepository.find({ relations: ["books"] });
    if (!authors.length) throw createDomainError("No authors found");

    res.json({
      success: true,
      data: authors,
      message: "Authors retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const author = await authorRepository.findOne({
      where: { id },
      relations: ["books"],
    });
    if (!author) throw createDomainError("Author not found");

    res.json({
      success: true,
      data: author,
      message: "Author retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      biography,
      nationality,
      birthDate,
      deathDate,
      isPopular,
    } = req.body;
    if (!firstName || !lastName || !biography || !nationality || !birthDate) {
      throw createDomainError("Missing required author fields");
    }

    const author = authorRepository.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      biography,
      nationality,
      birthDate,
      deathDate: deathDate || null,
      isPopular: !!isPopular,
    });

    await authorRepository.save(author);

    res.status(201).json({
      success: true,
      data: author,
      message: "Author created successfully",
      timestamp: new Date().toISOString(),
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const author = await authorRepository.findOneBy({ id });
    if (!author) throw createDomainError("Author not found");

    await authorRepository.remove(author);

    res.json({
      success: true,
      message: "Author deleted successfully",
      timestamp: new Date().toISOString(),
    });
  }),
};
