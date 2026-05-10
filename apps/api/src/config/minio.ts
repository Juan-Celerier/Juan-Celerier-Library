import { S3Client } from "@aws-sdk/client-s3";

// Configuración de MinIO
export const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "minioadmin",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "minioadmin",
  },
  region: process.env.MINIO_REGION || "us-east-1",
  forcePathStyle: true, // Importante para MinIO
});

export const BUCKET_NAME = process.env.MINIO_BUCKET || "library-images";
