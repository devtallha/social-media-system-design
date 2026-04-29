import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.S3_REGION || 'us-east-1',
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true, // Required for MinIO
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string,
      },
    });
    this.bucket = process.env.S3_BUCKET as string;
  }

  async getPresignedUrl(fileType: string) {
    const key = `posts/${uuidv4()}-${Date.now()}.${fileType.split('/')[1]}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    
    return {
      uploadUrl: url,
      key: key,
      imageUrl: `${process.env.S3_ENDPOINT}/${this.bucket}/${key}`,
    };
  }
}
