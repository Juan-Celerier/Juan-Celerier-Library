import { Router } from "express";
import { authorController } from "../controllers/author.controller.js";
import {
  authMiddleware,
  librarianOnly,
} from "../middlewares/auth-middlewares.js";

const router = Router();

// Rutas públicas (lectura) - cualquier usuario autenticado puede ver autores
router.get("/", authMiddleware, authorController.getAll);
router.get("/:id", authMiddleware, authorController.getById);

// Rutas administrativas - solo bibliotecarios pueden modificar
router.post("/", authMiddleware, librarianOnly, authorController.create);
router.delete("/:id", authMiddleware, librarianOnly, authorController.delete);

export default router;
