import { Router } from "express";
import { loanController } from "../controllers/loan.controller.js";

const router = Router();

router.get("/", loanController.getAll);
router.get("/:id", loanController.getById);
router.post("/", loanController.create);
router.put("/:id", loanController.update);
router.delete("/:id", loanController.delete);

export default router;
