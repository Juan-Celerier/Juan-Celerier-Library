import { Router } from "express";
import { favoriteController } from "../controllers/favorite.controller.js";
import { authMiddleware } from "../middlewares/auth-middlewares.js";

const router = Router();

router.get("/", authMiddleware, favoriteController.getAll);
router.get("/user/:userId", authMiddleware, favoriteController.getByUser);
router.get("/book/:bookId", authMiddleware, favoriteController.getByBook);
router.get("/check/:userId/:bookId", authMiddleware, favoriteController.check);
router.post("/", authMiddleware, favoriteController.create);
router.delete("/:userId/:bookId", authMiddleware, favoriteController.delete);

export default router;
