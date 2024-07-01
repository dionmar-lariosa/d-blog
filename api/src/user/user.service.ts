import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll(cursor: number, pageSize: number) {
    const users = await this.prismaService.user.findMany({
      skip: cursor,
      take: pageSize,
    });
    const usersCount = await this.prismaService.user.count();
    return {
      users,
      usersCount,
    };
  }
}
