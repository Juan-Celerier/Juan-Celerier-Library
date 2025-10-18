// api/src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import authorRoutes from "./author.routes.js";
import bookRoutes from "./book.routes.js";
import categoryRoutes from "./category.routes.js";
import publisherRoutes from "./publisher.routes.js";
import reservationRoutes from "./reservation.routes.js";
import userRoutes from "./user.routes.js";
import loanRoutes from "./loan.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);
router.use("/categories", categoryRoutes);
router.use("/publishers", publisherRoutes);
router.use("/reservations", reservationRoutes);
router.use("/users", userRoutes);
router.use("/loans", loanRoutes);

export default router;
