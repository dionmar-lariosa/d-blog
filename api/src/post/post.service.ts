import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async getAll(cursor: number, pageSize: number) {
    return await this.prismaService.post.findMany({
      skip: cursor,
      take: pageSize,
    });
  }

  async create(dto: Prisma.PostCreateInput) {
    return await this.prismaService.post.create({
      data: {
        ...dto,
        user: {
          connect: { id: 1 },
        },
      },
    });
  }

  async get(id: number) {
    return await this.prismaService.post.findUniqueOrThrow({ where: { id } });
  }

  async delete(id: number) {
    return await this.prismaService.post.delete({ where: { id } });
  }
}
