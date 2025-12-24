// api/src/controllers/book.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/data.js";
import { BookEntity } from "../entities/book.entity.js";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
export const bookController = () => {
  const repository = AppDataSource.getRepository(BookEntity);

  return {
    getAll: asyncHandler(async (req: Request, res: Response) => {
      const books = await repository.find({
        relations: ["author", "category", "publisher"],
      });
      const transformedBooks = books.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author
          ? `${book.author.firstName} ${book.author.lastName}`
          : "Desconocido",
        availableCopies: book.availableCopies,
        imageUrl: book.image,
        image: book.image,
        description: book.description,
      }));
      res.json(transformedBooks);
    }),

    getById: asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const book = await repository.findOne({
        where: { id },
        relations: ["author", "category", "publisher"],
      });
      if (!book) throw createDomainError("Book not found");
      const transformedBook = {
        id: book.id,
        title: book.title,
        author: book.author
          ? `${book.author.firstName} ${book.author.lastName}`
          : "Desconocido",
        availableCopies: book.availableCopies,
        imageUrl: book.image,
        image: book.image,
        description: book.description,
      };
      res.json(transformedBook);
    }),

    create: asyncHandler(async (req: Request, res: Response) => {
      const data = req.body;
      const book = repository.create(data);
      await repository.save(book);
      res.status(201).json({ success: true, data: book });
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const book = await repository.findOne({ where: { id } });
      if (!book) throw createDomainError("Book not found");

      repository.merge(book, req.body);
      const updated = await repository.save(book);
      res.json({ success: true, data: updated });
    }),

    delete: asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const book = await repository.findOne({ where: { id } });
      if (!book) throw createDomainError("Book not found");

      await repository.remove(book);
      res.json({ success: true, message: "Book deleted successfully" });
    }),
  };
};
