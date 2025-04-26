import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('REGION');
    const endpoint = this.configService.get<string>('ENDPOINT');
    const accessKeyId = this.configService.get<string>('ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('SECRET_ACCESS_KEY');
    this.bucketName = this.configService.get<string>('BUCKET_NAME')!;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('AWS credentials are missing!');
    }

    this.s3Client = new S3Client({
      endpoint: endpoint,
      region: region,
      forcePathStyle: true,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder = 'objects',
  ): Promise<string> {
    const timestamp = Date.now();
    const extension = file.originalname.split('.').pop();
    const key = `${folder}/${timestamp}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });

    try {
      await this.s3Client.send(command);
      return `/files/${key}`;
    } catch (error) {
      throw new InternalServerErrorException('File upload failed');
    }
  }

  async getFile(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    return {
      body: response.Body as Readable,
      contentType: response.ContentType,
      contentLength: response.ContentLength,
      lastModified: response.LastModified,
      metadata: response.Metadata,
    };
  }

  private s3Client: S3Client;
  private readonly bucketName: string;
}
