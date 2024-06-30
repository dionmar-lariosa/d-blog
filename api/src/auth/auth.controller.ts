import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login_i } from './auth.interface';

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
}
