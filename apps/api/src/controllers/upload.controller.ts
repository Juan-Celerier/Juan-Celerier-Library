import { Request, Response } from "express";
import ImageStorageService from "../services/image-storage.services.js";

export class UploadController {
  static async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No se encontró archivo" });
      }

      const imageUrl = await ImageStorageService.uploadImage(req.file);

      res.json({
        success: true,
        url: imageUrl,
        message: "Imagen subida exitosamente",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        error: "Error al subir la imagen",
        details: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
