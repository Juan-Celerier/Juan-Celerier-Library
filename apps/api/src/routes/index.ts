// apps/api/src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import authorRoutes from "./author.routes.js";
import bookRoutes from "./book.routes.js";
import categoryRoutes from "./category.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import publisherRoutes from "./publisher.routes.js";
import reservationRoutes from "./reservation.routes.js";
import userRoutes from "./user.routes.js";
import loanRoutes from "./loan.routes.js";
import favoriteRoutes from "./favorite.routes.js";
import uploadRoutes from "./upload.routes.js"; // Importación del router de subida

const router = Router();

router.use("/auth", authRoutes);
router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
router.use("/categories", categoryRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/publishers", publisherRoutes);
router.use("/reservations", reservationRoutes);
router.use("/users", userRoutes);
router.use("/loans", loanRoutes);
router.use("/favorites", favoriteRoutes);

/**
 * Esta línea registra el router de upload bajo el prefijo /upload
 * permitiendo que el endpoint final sea /upload/image
 */
router.use("/upload", uploadRoutes);

export default router;
