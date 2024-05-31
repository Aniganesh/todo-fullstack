import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ImageStorageService {
  constructor(private cloudinaryService: CloudinaryService) {}
  uploadImage(file: Express.Multer.File) {
    this.cloudinaryService.uploadFile(file);
  }
}
