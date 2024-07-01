import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { generateUuid } from 'src/app.util';
import { TokenPayload_i } from 'src/auth/auth.interface';
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

  async create(tokenPayload: TokenPayload_i, dto: Prisma.PostCreateInput) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { uuid: tokenPayload.uuid },
    });
    return await this.prismaService.post.create({
      data: {
        ...dto,
        uuid: generateUuid(),
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  async update(uuid: string, dto: Prisma.PostUpdateInput) {
    return await this.prismaService.post.update({ where: { uuid }, data: dto });
  }

  async get(uuid: string) {
    return await this.prismaService.post.findUniqueOrThrow({ where: { uuid } });
  }

  async delete(uuid: string) {
    return await this.prismaService.post.delete({ where: { uuid } });
  }
}
