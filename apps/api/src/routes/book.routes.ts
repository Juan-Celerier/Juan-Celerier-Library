import { Router } from "express";
import { bookController } from "../controllers/book.controller.js";
import { authMiddleware, librarianOnly } from "../middlewares/auth-middlewares.js";

const router = Router();
const controller = bookController();

// Rutas públicas (lectura) - cualquier usuario autenticado puede ver libros
router.get("/", authMiddleware, controller.getAll);
router.get("/:id", authMiddleware, controller.getById);

// Rutas administrativas - solo bibliotecarios pueden modificar
router.post("/", authMiddleware, librarianOnly, controller.create);
router.put("/:id", authMiddleware, librarianOnly, controller.update);
router.delete("/:id", authMiddleware, librarianOnly, controller.delete);

export default router;
