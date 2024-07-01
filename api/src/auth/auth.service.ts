import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Login_i, TokenPayload_i } from './auth.interface';
import { generateUuid, hashPassword, verifyHashedPassword } from 'src/app.util';
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
    });
    const isPasswordMatch = await verifyHashedPassword(
      user.password,
      dto.password,
    );
    if (isPasswordMatch) {
      const payload: TokenPayload_i = {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      };
      return {
        ...payload,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new Error('Incorrect Password');
    }
  }

  async register(dto: Prisma.UserCreateInput) {
    const { password, ...rest } = dto;
    const newUser = await this.prismaService.user.create({
      data: {
        ...rest,
        uuid: generateUuid(),
        password: await hashPassword(password),
      },
    });
    const payload: TokenPayload_i = {
      id: newUser.id,
      uuid: newUser.uuid,
      email: newUser.email,
      name: newUser.name,
      isAdmin: newUser.isAdmin,
    };
    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
