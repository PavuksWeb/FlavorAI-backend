import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(email, password);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.send({ message: 'Logged in successfully' });
  }

  @Post('signup')
  async registartion(
    @Body() newUser: Prisma.UserCreateInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signup(newUser);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { message: 'User registered successfully' };
  }
}
