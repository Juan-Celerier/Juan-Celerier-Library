// apps/api/src/routes/upload.routes.ts
import { Router } from "express";
import { UploadController } from "../controllers/upload.controller.js";
import { uploadImage } from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/image",
  uploadImage.single("image"),
  UploadController.uploadImage,
);

export default router;
