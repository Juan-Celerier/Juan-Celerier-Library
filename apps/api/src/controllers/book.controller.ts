// api/src/controllers/book.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/data.js";
import { BookEntity } from "../entities/book.entity.js";
import { AuthorEntity } from "../entities/author.entity.js";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";

export const bookController = () => {
  const repository = AppDataSource.getRepository(BookEntity);
  const authorRepository = AppDataSource.getRepository(AuthorEntity);

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
      const data = req.body as any;
      // Handle author as { name: string } by parsing to firstName/lastName and save it
      if (data.author && typeof data.author === "object" && data.author.name) {
        const nameParts = data.author.name.trim().split(" ");
        const authorData = {
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          biography: "",
          nationality: "",
          birthDate: new Date(),
          isPopular: false,
        };
        const author = authorRepository.create(authorData);
        await authorRepository.save(author);
        data.author = author;
      }
      // Set totalCopies to availableCopies if not provided
      if (data.availableCopies && !data.totalCopies) {
        data.totalCopies = data.availableCopies;
      }
      const book = repository.create(data);
      const savedBook = (await repository.save(book)) as unknown as BookEntity;
      // Reload with relations to get complete data
      const completeBook = await repository.findOne({
        where: { id: savedBook.id },
        relations: ["author", "category", "publisher"],
      });
      const transformedBook = {
        id: completeBook!.id,
        title: completeBook!.title,
        author: completeBook!.author
          ? `${completeBook!.author.firstName} ${completeBook!.author.lastName}`
          : "Desconocido",
        availableCopies: completeBook!.availableCopies,
        imageUrl: completeBook!.image,
        image: completeBook!.image,
        description: completeBook!.description,
      };
      res.status(201).json({ success: true, data: transformedBook });
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const book = await repository.findOne({ where: { id } });
      if (!book) throw createDomainError("Book not found");

      const data = req.body;
      // Handle author as { name: string } by parsing to firstName/lastName and save it
      if (data.author && typeof data.author === "object" && data.author.name) {
        const nameParts = data.author.name.trim().split(" ");
        const authorData = {
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          biography: "",
          nationality: "",
          birthDate: new Date(),
          isPopular: false,
        };
        const author = authorRepository.create(authorData);
        await authorRepository.save(author);
        data.author = author;
      }
      // Set totalCopies to availableCopies if availableCopies is provided
      if (data.availableCopies !== undefined) {
        data.totalCopies = data.availableCopies;
      }
      repository.merge(book, data);
      const updated = await repository.save(book);
      // Reload with relations
      const completeUpdated = await repository.findOne({
        where: { id: updated.id },
        relations: ["author", "category", "publisher"],
      });
      const transformedUpdated = {
        id: completeUpdated!.id,
        title: completeUpdated!.title,
        author: completeUpdated!.author
          ? `${completeUpdated!.author.firstName} ${completeUpdated!.author.lastName}`
          : "Desconocido",
        availableCopies: completeUpdated!.availableCopies,
        imageUrl: completeUpdated!.image,
        image: completeUpdated!.image,
        description: completeUpdated!.description,
      };
      res.json({ success: true, data: transformedUpdated });
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
