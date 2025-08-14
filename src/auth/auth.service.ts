import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(data: Prisma.UserCreateInput): Promise<AuthEntity> {
    const candidate = await this.databaseService.user.findUnique({
      where: { email: data.email },
    });

    if (candidate) {
      throw new HttpException('User is already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.createUser(data);

    return {
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.databaseService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { userId: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
