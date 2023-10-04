import { CopyObjectCommand, DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: `${process.env.R2_ID}`,
    secretAccessKey: `${process.env.R2_SECRET}`,
  },
});

export async function url(Bucket: string, Key: string, expire = 60 * 60): Promise<string> {
  const command = new PutObjectCommand({ Bucket, Key });
  return await getSignedUrl(client, command, { expiresIn: expire });
}

export async function del(Bucket: string, Key: string, strict = false) {
  try {
    await client.send(new DeleteObjectCommand({ Bucket, Key }));
  } catch (e) {
    if (strict) throw e;
  }
}

export async function copy(Bucket: string, from: string, to: string) {
  await client.send(new CopyObjectCommand({ Bucket, Key: to, CopySource: from }));
}

export async function move(Bucket: string, from: string, to: string) {
  await copy(Bucket, from, to);
  await del(Bucket, from);
}

const r2 = {
  client,
  url,
  del,
  copy,
  move,
};

export default r2;
