import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { CheckAbilities } from 'src/app.decorator';
import { Action } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { PostEntity } from './post-entity';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAll(
    @Query('cursor', ParseIntPipe) cursor: number = 0,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ) {
    try {
      return await this.postService.getAll(cursor, pageSize);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    try {
      return await this.postService.get(uuid);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  async create(@Request() req, @Body() dto: Prisma.PostCreateInput) {
    try {
      return await this.postService.create(req.user, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':uuid')
  @CheckAbilities({ action: Action.Update, subject: PostEntity })
  async update(
    @Param('uuid') uuid: string,
    @Body() dto: Prisma.PostUpdateInput,
  ) {
    try {
      return await this.postService.update(uuid, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    try {
      return await this.postService.delete(uuid);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
