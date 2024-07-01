import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';

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

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.postService.get(id);
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

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.postService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
