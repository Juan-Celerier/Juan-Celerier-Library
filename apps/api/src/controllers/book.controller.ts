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

  const transform = (book: BookEntity) => ({
    id: book.id,
    title: book.title,
    author: book.author
      ? `${book.author.firstName} ${book.author.lastName}`
      : "Desconocido",
    availableCopies: book.availableCopies,
    imageUrl: book.image,
    description: book.description,
  });

  return {
    getAll: asyncHandler(async (req: Request, res: Response) => {
      const books = await repository.find({
        relations: ["author", "category", "publisher"],
      });
      res.json(books.map(transform));
    }),

    getById: asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const book = await repository.findOne({
        where: { id },
        relations: ["author", "category", "publisher"],
      });
      if (!book) throw createDomainError("Book not found");
      res.json(transform(book));
    }),

    create: asyncHandler(async (req: Request, res: Response) => {
      const data = req.body;

      if (data.author && typeof data.author === "object" && data.author.name) {
        const nameParts = data.author.name.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        let author = await authorRepository.findOne({
          where: { firstName, lastName },
        });

        if (!author) {
          author = authorRepository.create({
            firstName,
            lastName,
            biography: "",
            nationality: "",
            birthDate: new Date(),
            isPopular: false,
          });
          await authorRepository.save(author);
        }
        data.author = author;
      }

      if (data.imageUrl) {
        data.image = data.imageUrl;
      }

      if (data.availableCopies !== undefined && !data.totalCopies) {
        data.totalCopies = data.availableCopies;
      }

      const book = repository.create(data);
      // Forzamos el tipo para evitar el error de "BookEntity[]"
      const savedBook = (await repository.save(book)) as unknown as BookEntity;

      const completeBook = await repository.findOne({
        where: { id: savedBook.id },
        relations: ["author", "category", "publisher"],
      });

      res.status(201).json({ success: true, data: transform(completeBook!) });
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const data = req.body;

      const book = await repository.findOne({ where: { id } });
      if (!book) throw createDomainError("Book not found");

      if (data.author && typeof data.author === "object" && data.author.name) {
        const nameParts = data.author.name.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        let author = await authorRepository.findOne({
          where: { firstName, lastName },
        });
        if (!author) {
          author = authorRepository.create({
            firstName,
            lastName,
            birthDate: new Date(),
          });
          await authorRepository.save(author);
        }
        data.author = author;
      }

      if (data.imageUrl) {
        data.image = data.imageUrl;
      }

      if (data.availableCopies !== undefined) {
        data.totalCopies = data.availableCopies;
      }

      repository.merge(book, data);
      const updated = (await repository.save(book)) as BookEntity;

      const completeUpdated = await repository.findOne({
        where: { id: updated.id },
        relations: ["author", "category", "publisher"],
      });

      res.json({ success: true, data: transform(completeUpdated!) });
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
