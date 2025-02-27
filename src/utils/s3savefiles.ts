import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3_BUCKET = import.meta.env.VITE_BUTCKET_NAME; // Reemplaza con el nombre de tu bucket
const REGION = import.meta.env.VITE_REGION; // Ejemplo: "us-west-2"

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY, // Reemplaza con tu Access Key
    secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY, // Reemplaza con tu Secret Key
  },
});

interface UploadResult {
  fileName: string;
  url: string;
}

export const uploadDocumentsToS3 = async (files: File[]): Promise<UploadResult[]> => {
  if (!files || files.length === 0) {
    throw new Error("No files provided for upload.");
  }

  const uploadPromises = files.map(async (file) => {
    if (file.type !== "application/pdf") {
      throw new Error(`Invalid file type: ${file.name}. Only PDF files are allowed.`);
    }

    const fileName = `uploads/${Date.now()}-${file.name}`; // Evita nombres duplicados
    const uploadParams = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: await file.arrayBuffer(), // Convierte a buffer
      ContentType: "application/pdf",
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const url = await getSignedUrl(s3Client, new PutObjectCommand({ Bucket: S3_BUCKET, Key: fileName }), { expiresIn: 3600 });

    return { fileName, url };
  });

  return Promise.all(uploadPromises);
};
