import { Request, Response } from "express";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
import { AppDataSource } from "../config/data.js";
import { LoanEntity } from "../entities/loan.entity.js";

const loanRepository = AppDataSource.getRepository(LoanEntity);

export const loanController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const loans = await loanRepository.find({ relations: ["user", "book"] });
    if (!loans.length) throw createDomainError("No loans found");
    res.json({
      success: true,
      data: loans,
      message: "Loans retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const loan = await loanRepository.findOne({
      where: { id },
      relations: ["user", "book"],
    });
    if (!loan) throw createDomainError("Loan not found");
    res.json({
      success: true,
      data: loan,
      message: "Loan retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { user, book, loanDate, returnDate } = req.body;
    if (!user || !book || !loanDate)
      throw createDomainError("Missing required loan fields");
    const loan = loanRepository.create({
      user,
      book,
      loanDate,
      returnDate: returnDate || null,
    });
    await loanRepository.save(loan);
    res.status(201).json({
      success: true,
      data: loan,
      message: "Loan created",
      timestamp: new Date().toISOString(),
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const loan = await loanRepository.findOneBy({ id });
    if (!loan) throw createDomainError("Loan not found");
    await loanRepository.remove(loan);
    res.json({
      success: true,
      message: "Loan deleted",
      timestamp: new Date().toISOString(),
    });
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { returnDate } = req.body;
    const loan = await loanRepository.findOneBy({ id });
    if (!loan) throw createDomainError("Loan not found");
    loan.returnDate = returnDate;
    await loanRepository.save(loan);
    res.json({
      success: true,
      data: loan,
      message: "Loan updated",
      timestamp: new Date().toISOString(),
    });
  }),
};
