import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import {
  authMiddleware,
  librarianOnly,
} from "../middlewares/auth-middlewares.js";

const router = Router();

// Rutas públicas (lectura) - cualquier usuario autenticado puede ver categorías
router.get("/", authMiddleware, categoryController.getAll);
router.get("/:id", authMiddleware, categoryController.getById);

// Rutas administrativas - solo bibliotecarios pueden modificar
router.post("/", authMiddleware, librarianOnly, categoryController.create);
router.put("/:id", authMiddleware, librarianOnly, categoryController.update);
router.delete("/:id", authMiddleware, librarianOnly, categoryController.delete);

export default router;
