import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const maxPhotoSize = 5 * 1024 * 1024;
const allowedPhotoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
};

const globalForR2 = globalThis as typeof globalThis & {
  r2Client?: S3Client;
};

function getR2Config(): R2Config {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    throw new Error(
      "R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL are required.",
    );
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl: publicUrl.replace(/\/$/, ""),
  };
}

function getR2Client() {
  if (globalForR2.r2Client) {
    return globalForR2.r2Client;
  }

  const config = getR2Config();
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  if (process.env.NODE_ENV !== "production") {
    globalForR2.r2Client = client;
  }

  return client;
}

export async function uploadRecipePhoto(recipeId: string, file: File) {
  if (!allowedPhotoTypes.has(file.type)) {
    throw new Error("Photo must be a JPEG, PNG, or WebP image.");
  }

  if (file.size > maxPhotoSize) {
    throw new Error("Photo must be 5MB or smaller.");
  }

  const config = getR2Config();
  const extension = getExtension(file);
  const key = `recipes/${recipeId}/${crypto.randomUUID()}${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: key,
      Body: bytes,
      ContentType: file.type,
    }),
  );

  return {
    key,
    url: `${config.publicUrl}/${key}`,
  };
}

export async function deleteRecipePhoto(photoUrl: string | null) {
  const key = getKeyFromPublicUrl(photoUrl);

  if (!key) {
    return;
  }

  await getR2Client().send(
    new DeleteObjectCommand({
      Bucket: getR2Config().bucketName,
      Key: key,
    }),
  );
}

function getExtension(file: File) {
  if (file.type === "image/png") {
    return ".png";
  }

  if (file.type === "image/webp") {
    return ".webp";
  }

  return ".jpg";
}

function getKeyFromPublicUrl(photoUrl: string | null) {
  if (!photoUrl) {
    return null;
  }

  const publicUrl = getR2Config().publicUrl;

  if (!photoUrl.startsWith(`${publicUrl}/`)) {
    return null;
  }

  return photoUrl.slice(publicUrl.length + 1);
}
