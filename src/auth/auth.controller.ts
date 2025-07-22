import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Request() req: Request, @Body() authPayLoad: AuthPayloadDto) {
    req.user;
    return this.authService.validateUser(authPayLoad);
  }
}
