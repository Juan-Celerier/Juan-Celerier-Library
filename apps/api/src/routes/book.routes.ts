import { Router } from "express";
import { bookController } from "../controllers/book.controller.js";

const router = Router();
const controller = bookController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
