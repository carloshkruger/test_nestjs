import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { LoggedUser } from '../users/decorators/logged-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @LoggedUser() user: User) {
    return this.postsService.create(user.id, createPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @LoggedUser() user: User,
  ) {
    return this.postsService.update(id, user.id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @LoggedUser() user: User) {
    this.postsService.remove(id, user.id);
  }
}
