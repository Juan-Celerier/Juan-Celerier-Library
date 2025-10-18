import { Router } from "express";
import { publisherController } from "../controllers/publisher.controller.js";

const router = Router();

router.get("/", publisherController.getAll);
router.get("/:id", publisherController.getById);
router.post("/", publisherController.create);
router.put("/:id", publisherController.update);
router.delete("/:id", publisherController.delete);

export default router;
