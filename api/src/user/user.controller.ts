import {
  Controller,
  Get,
  InternalServerErrorException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CheckAbilities } from 'src/app.decorator';
import { Action } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { UserEntity } from './user-entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @CheckAbilities({ action: Action.Manage, subject: UserEntity })
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
