import { HeadBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import { s3Client, BUCKET_NAME } from "../config/minio.js";
import multer from "multer";
export class ImageStorageService {
  static async ensureBucketExists() {
    try {
      await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
    } catch (error) {
      // Bucket no existe, pero MinIO lo crea automáticamente en el primer upload
      console.log("Bucket will be created on first upload");
    }
  }

  static async uploadImage(file: Express.Multer.File): Promise<string> {
    await this.ensureBucketExists();

    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read" as const,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    // Retornar URL pública
    const endpoint = process.env.MINIO_ENDPOINT || "http://localhost:9000";
    return `${endpoint}/${BUCKET_NAME}/${fileName}`;
  }
}

export default ImageStorageService;

function uuidv4() {
  return crypto.randomUUID();
}
