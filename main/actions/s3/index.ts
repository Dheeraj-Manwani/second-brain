import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";

export const storeFileInS3 = async (
  file: Buffer | undefined
): Promise<string | undefined> => {
  if (!file) return;
  const fileKey = uuid();
  // Set the region and access keys
  AWS.config.update({
    region: "ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  // Create a new instance of the S3 class
  const s3 = new AWS.S3();
  // Set the parameters for the file you want to upload
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey + ".jpeg",
    Body: file,
    ContentType: "image/jpeg", // Adjust based on the image type
  };
  // Upload the file to S3
  s3.upload(params, (err: Error) => {
    if (err) {
      console.log("Error uploading file:", err);
    }
  });

  return fileKey;
};
