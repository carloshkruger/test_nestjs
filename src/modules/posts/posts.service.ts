import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  create(userId: string, { title, content }: CreatePostDto) {
    const model = this.postsRepository.create({
      userId,
      title,
      content,
    });

    return this.postsRepository.save(model);
  }

  findOne(id: string) {
    return this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.postsRepository.find();
  }

  async update(id: string, userId: string, { title, content }: UpdatePostDto) {
    const model = await this.findOne(id);

    if (model && model.userId !== userId) {
      throw new ForbiddenException();
    }

    this.postsRepository.update(
      {
        id,
      },
      {
        title,
        content,
      },
    );
  }

  async remove(id: string, userId: string) {
    const model = await this.findOne(id);

    if (model && model.userId !== userId) {
      throw new ForbiddenException();
    }

    this.postsRepository.delete({
      id,
    });
  }
}
