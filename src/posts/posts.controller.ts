import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  // @UploadedFile для работы с файлами, похоже на req.files видимо
  @Post()
  @UseInterceptors(FileInterceptor('image')) // для работы с файлами, внутри название переменной в которую положится файл
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image);
  }
}
