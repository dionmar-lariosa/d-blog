import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Login_i } from './auth.interface';
import { hashPassword, verifyHashedPassword } from 'src/app.util';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: Login_i) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email: dto.email },
      select: {
        name: true,
        email: true,
        password: true,
      },
    });
    const isPasswordMatch = await verifyHashedPassword(
      user.password,
      dto.password,
    );
    if (isPasswordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return {
        ...rest,
        access_token: this.jwtService.sign(rest),
      };
    } else {
      throw new Error('Incorrect Password');
    }
  }

  async register(dto: Prisma.UserCreateInput) {
    const { password, ...rest } = dto;
    await this.prismaService.user.create({
      data: {
        ...rest,
        password: await hashPassword(password),
      },
    });
    return {
      ...rest,
      access_token: this.jwtService.sign(rest),
    };
  }
}
