import { Request, Response } from "express";
import {
  asyncHandler,
  createDomainError,
} from "../middlewares/error-handler.js";
import { AppDataSource } from "../config/data.js";
import { PublisherEntity } from "../entities/publisher-entity.js";

const publisherRepository = AppDataSource.getRepository(PublisherEntity);

export const publisherController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const publishers = await publisherRepository.find({ relations: ["books"] });
    if (!publishers.length) throw createDomainError("No publishers found");
    res.json({
      success: true,
      data: publishers,
      message: "Publishers retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const publisher = await publisherRepository.findOne({
      where: { id },
      relations: ["books"],
    });
    if (!publisher) throw createDomainError("Publisher not found");
    res.json({
      success: true,
      data: publisher,
      message: "Publisher retrieved",
      timestamp: new Date().toISOString(),
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) throw createDomainError("Publisher name is required");
    const publisher = publisherRepository.create({ name });
    await publisherRepository.save(publisher);
    res.status(201).json({
      success: true,
      data: publisher,
      message: "Publisher created",
      timestamp: new Date().toISOString(),
    });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const publisher = await publisherRepository.findOneBy({ id });
    if (!publisher) throw createDomainError("Publisher not found");
    await publisherRepository.remove(publisher);
    res.json({
      success: true,
      message: "Publisher deleted",
      timestamp: new Date().toISOString(),
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const publisher = await publisherRepository.findOneBy({ id });
    if (!publisher) throw createDomainError("Publisher not found");
    publisher.name = name;
    await publisherRepository.save(publisher);
    res.json({
      success: true,
      data: publisher,
      message: "Publisher updated",
      timestamp: new Date().toISOString(),
    });
  }),
};
