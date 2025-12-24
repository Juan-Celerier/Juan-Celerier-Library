import { Request, Response } from "express";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
import { AppDataSource } from "../config/data.js";
import { ReservationEntity } from "../entities/reservation.entity.js";

const reservationRepository = AppDataSource.getRepository(ReservationEntity);

export const reservationController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const reservations = await reservationRepository.find({
      relations: ["user", "book"],
    });
    if (!reservations.length) throw createDomainError("No reservations found");
    res.json({
      success: true,
      data: reservations,
      message: "Reservations retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const reservation = await reservationRepository.findOne({
      where: { id },
      relations: ["user", "book"],
    });
    if (!reservation) throw createDomainError("Reservation not found");
    res.json({
      success: true,
      data: reservation,
      message: "Reservation retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  getByUser: asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const reservations = await reservationRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "book", "book.author"],
    });
    res.json(reservations);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { user, book, reservedAt } = req.body;
    if (!user || !book || !reservedAt)
      throw createDomainError("Missing required reservation fields");
    const reservation = reservationRepository.create({
      user,
      book,
      reservedAt,
    });
    await reservationRepository.save(reservation);
    res.status(201).json({
      success: true,
      data: reservation,
      message: "Reservation created",
      timestamp: new Date().toISOString(),
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const reservation = await reservationRepository.findOneBy({ id });
    if (!reservation) throw createDomainError("Reservation not found");
    await reservationRepository.remove(reservation);
    res.json({
      success: true,
      message: "Reservation deleted",
      timestamp: new Date().toISOString(),
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reservedAt } = req.body;
    const reservation = await reservationRepository.findOneBy({ id });
    if (!reservation) throw createDomainError("Reservation not found");
    reservation.reservedAt = reservedAt;
    await reservationRepository.save(reservation);
    res.json({
      success: true,
      data: reservation,
      message: "Reservation updated",
      timestamp: new Date().toISOString(),
    });
  }),
};
