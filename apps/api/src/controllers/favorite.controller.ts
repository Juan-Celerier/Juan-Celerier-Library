import { Request, Response } from "express";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
import { AppDataSource } from "../config/data.js";
import { FavoriteEntity } from "../entities/favorite.entity.js";

const favoriteRepository = AppDataSource.getRepository(FavoriteEntity);

export const favoriteController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const favorites = await favoriteRepository.find({
      relations: ["user", "book"],
    });
    res.json({
      success: true,
      data: favorites,
      message: "Favorites retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  getByUser: asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const favorites = await favoriteRepository.find({
      where: { userId },
      relations: ["book", "book.author"],
    });
    res.json({
      success: true,
      data: favorites,
      message: "User favorites retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  getByBook: asyncHandler(async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const favorites = await favoriteRepository.find({
      where: { bookId },
      relations: ["user"],
    });
    res.json({
      success: true,
      data: favorites,
      message: "Book favorites retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      throw createDomainError("User ID and Book ID are required");
    }

    // Check if favorite already exists
    const existingFavorite = await favoriteRepository.findOne({
      where: { userId, bookId },
    });

    if (existingFavorite) {
      throw createDomainError("This book is already in favorites");
    }

    const favorite = favoriteRepository.create({
      userId,
      bookId,
    });

    await favoriteRepository.save(favorite);
    res.status(201).json({
      success: true,
      data: favorite,
      message: "Favorite added",
      timestamp: new Date().toISOString(),
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { userId, bookId } = req.params;
    const favorite = await favoriteRepository.findOne({
      where: { userId, bookId },
    });

    if (!favorite) {
      throw createDomainError("Favorite not found");
    }

    await favoriteRepository.remove(favorite);
    res.json({
      success: true,
      message: "Favorite removed",
      timestamp: new Date().toISOString(),
    });
  }),

  check: asyncHandler(async (req: Request, res: Response) => {
    const { userId, bookId } = req.params;
    const favorite = await favoriteRepository.findOne({
      where: { userId, bookId },
    });

    res.json({
      success: true,
      isFavorite: !!favorite,
      timestamp: new Date().toISOString(),
    });
  }),
};
