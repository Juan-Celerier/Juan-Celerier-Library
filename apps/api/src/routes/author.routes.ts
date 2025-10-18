import { Router } from "express";
import { authorController } from "../controllers/author.controller.js";

const router = Router();

router.get("/", authorController.getAll);
router.get("/:id", authorController.getById);
router.post("/", authorController.create);
router.delete("/:id", authorController.delete);

export default router;
