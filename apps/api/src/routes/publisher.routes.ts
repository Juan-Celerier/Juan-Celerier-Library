import { Router } from "express";
import { publisherController } from "../controllers/publisher.controller.js";
import {
  authMiddleware,
  librarianOnly,
} from "../middlewares/auth-middlewares.js";

const router = Router();

// Rutas públicas (lectura) - cualquier usuario autenticado puede ver editores
router.get("/", authMiddleware, publisherController.getAll);
router.get("/:id", authMiddleware, publisherController.getById);

// Rutas administrativas - solo bibliotecarios pueden modificar
router.post("/", authMiddleware, librarianOnly, publisherController.create);
router.put("/:id", authMiddleware, librarianOnly, publisherController.update);
router.delete(
  "/:id",
  authMiddleware,
  librarianOnly,
  publisherController.delete,
);

export default router;
