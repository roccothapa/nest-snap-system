import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileTypeValidator } from '@appModules/uploader/validators/upload-file-type.validator';
import { diskStorage } from 'multer';
import { extname, normalize } from 'path';
import process from 'process';
import { generateRandomString } from '@snapSystem/helpers/helpers';

const imageStorage = diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      process.env.FILE_UPLOAD_BASE_DIRECTORY +
        process.env.FILE_UPLOAD_IMAGE_DIRECTORY,
    );
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now() + '-' + generateRandomString()}${extname(
        file.originalname,
      )}`,
    );
  },
});

@Controller('/api/upload-files')
@ApiTags('Upload Files')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('file', { storage: imageStorage }))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
            message: 'Supported file size must be under 5 MB.',
          }),
          new UploadFileTypeValidator({
            fileType: ['image/jpeg', 'image/png', 'image/jpg'],
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const path = file.path.replace(/\.\.\//g, '/');
    return {
      url: process.env.APP_URL + normalize(path),
    };
  }
}
