import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/models/users.entity';
import { UsersController } from './users.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), CloudinaryModule],
  providers: [UsersService, CloudinaryService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
