import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { GetUser } from '../auth/decorators/get-user.decorator.js';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/follow')
  async follow(@Param('id') id: string, @GetUser() user: any) {
    return this.usersService.follow(user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/unfollow')
  async unfollow(@Param('id') id: string, @GetUser() user: any) {
    return this.usersService.unfollow(user.userId, id);
  }
}
