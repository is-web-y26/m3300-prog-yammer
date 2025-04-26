import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException, Get, Param, Res, NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3Service';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

@ApiExcludeController()
@Controller('files')
export class FileUploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('uploadPhoto')
  @UseInterceptors(
    FileInterceptor('file', {
      // limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
          return callback(
            new BadRequestException('Допустимые форматы: JPEG и PNG.'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не найден');
    }
    const fileUrl = await this.s3Service.uploadFile(file, 'objects');
    console.log(fileUrl);
    return { url: fileUrl };
  }

  @Get('*path')
  async getFile(@Param("path") path: string, @Res() res: Response) {
    const key = path.replaceAll(',', '/');

    try {
      const file = await this.s3Service.getFile(key);

      if (file.contentType) {
        res.setHeader('Content-Type', file.contentType);
      }
      if (file.contentLength) {
        res.setHeader('Content-Length', file.contentLength);
      }
      if (file.lastModified) {
        res.setHeader('Last-Modified', file.lastModified.toUTCString());
      }

      res.setHeader('Content-Disposition', `inline; filename="${key}"`);
      file.body.pipe(res);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
