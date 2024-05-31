import { Module } from '@nestjs/common';
import { ImageStorageService } from './image-storage.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [ImageStorageService],
})
export class ImageStorageModule {}
