import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login_i } from './auth.interface';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: Login_i) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('register')
  async register(@Body() dto: Prisma.UserCreateInput) {
    try {
      return await this.authService.register(dto);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
