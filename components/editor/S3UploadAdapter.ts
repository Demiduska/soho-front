import { S3 } from "aws-sdk";

class S3UploadAdapter {
  loader: any;
  private s3: S3;

  constructor(loader: any) {
    if (
      !process.env.NEXT_PUBLIC_AWS_REGION ||
      !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
      !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ||
      !process.env.NEXT_PUBLIC_AWS_S3_BUCKET
    ) {
      throw new Error(
        "AWS configuration is missing. Please check your environment variables."
      );
    }

    this.loader = loader;
    this.s3 = new S3({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
  }

  async upload() {
    return new Promise(async (resolve, reject) => {
      const file = await this.loader.file;
      const params: S3.Types.PutObjectRequest = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET as string,
        Key: `ckeditor/${Date.now()}_${file.name}`,
        Body: file,
        ContentType: file.type,
        ACL: "public-read",
      };

      this.s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          return reject(err);
        }

        resolve({ default: data.Location });
      });
    });
  }

  abort() {
    // Implement the abort() method if needed
  }
}

export default S3UploadAdapter;
