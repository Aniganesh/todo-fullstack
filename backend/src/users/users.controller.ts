import {
  Body,
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUser } from 'dtos';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { z } from 'zod';
import { UsersService } from './users.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService: UsersService,
  ) {}

  @Post('profile-image')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Req() req,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1_000_000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const response = await this.cloudinaryService.uploadFile(file);
    const updateResponse = await this.usersService.update(req.user.id, {
      profileImage: response,
    });
    if (updateResponse.affected) {
      return this.usersService.get(req.user.id);
    }
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  async updateUser(@Req() req, @Body() body: UpdateUser) {
    try {
      const schema = z.object({
        name: z.string().nullable().optional(),
        profileImage: z.nullable(z.any()),
      });
      schema.parse(body);
    } catch (err) {
      throw new HttpException(err.issues, HttpStatus.BAD_REQUEST);
    }
    const updateRes = await this.usersService.update(req.user.id, body);
    if (updateRes.affected) {
      return this.usersService.get(req.user.id);
    } else {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
