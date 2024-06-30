import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { verifyHashedPassword } from 'src/utils/password.util';
import { Login_i } from './auth.interface';

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
      const token = {
        access_token: this.jwtService.sign(rest),
      };
      return {
        ...rest,
        ...token,
      };
    } else {
      throw new Error('Incorrect Password');
    }
  }
  async register() {}
}
