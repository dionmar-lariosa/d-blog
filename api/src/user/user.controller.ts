import {
  Controller,
  Get,
  InternalServerErrorException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(
    @Query('cursor', ParseIntPipe) cursor: number = 0,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ) {
    try {
      return await this.userService.getAll(cursor, pageSize);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
