import { Request, Response } from "express";
import { AppDataSource } from "../config/data.js";
import { BookEntity } from "../entities/book.entity.js";
import { UserEntity } from "../entities/user.entity.js";
import { LoanEntity } from "../entities/loan.entity.js";
import { asyncHandler } from "../middlewares/error-handler.js";

export const dashboardController = () => {
  const bookRepo = AppDataSource.getRepository(BookEntity);
  const userRepo = AppDataSource.getRepository(UserEntity);
  const loanRepo = AppDataSource.getRepository(LoanEntity);

  return {
    getStats: asyncHandler(async (req: Request, res: Response) => {
      const totalBooks = await bookRepo.count();
      const totalUsers = await userRepo.count();
      const activeLoans = await loanRepo.count({
        where: { status: "active" },
      });

      const stats = [
        {
          title: "Libros en Catálogo",
          value: totalBooks.toString(),
          change: "+2",
          changeType: "positive",
          color: "text-emerald-600",
          iconName: "BookOpen",
        },
        {
          title: "Préstamos Activos",
          value: activeLoans.toString(),
          change: activeLoans > 5 ? "+High" : "Normal",
          changeType: "neutral",
          color: "text-amber-500",
          iconName: "Clock",
        },
        {
          title: "Usuarios Registrados",
          value: totalUsers.toString(),
          change: "+12%",
          changeType: "positive",
          color: "text-blue-600",
          iconName: "Users",
        },
        {
          title: "Favoritos",
          value: "12",
          change: "+5%",
          changeType: "positive",
          color: "text-red-500",
          iconName: "Heart",
        },
      ];

      const featuredBooks = await bookRepo.find({
        take: 4,
        relations: ["author", "category", "publisher", "loans"],
      });

      res.json({
        stats,
        featuredBooks: featuredBooks.map((b) => ({
          id: b.id,
          title: b.title,
          author: b.author
            ? `${b.author.firstName} ${b.author.lastName}`
            : "Desconocido",
          rating: 4.8,
          genre: b.category?.name || "General",
          status: b.loans.some((loan) => loan.status === "active")
            ? "BORROWED"
            : "AVAILABLE",
          imageUrl: b.image,
        })),
      });
    }),
  };
};
