import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userSrvice: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userSrvice.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userSrvice.findAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userSrvice.findUserById(Number(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.userSrvice.updateUser(Number(id), data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.userSrvice.deleteUser(Number(id));
  }
}
