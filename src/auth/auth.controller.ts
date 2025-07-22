import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: Prisma.UserCreateInput) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: Prisma.UserCreateInput) {
    return this.authService.registration(userDto);
  }
}
