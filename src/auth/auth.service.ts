import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from 'generated/prisma';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: Prisma.UserCreateInput) {
    const user = await this.validateUser(userDto);
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    }
    return this.generateToken(user);
  }

  async registration(userDto: Prisma.UserCreateInput) {
    const candidate = await this.userService.findOne(userDto.email);
    if (candidate) {
      throw new HttpException(
        'This user is already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userDto: Prisma.UserCreateInput) {
    const user = await this.userService.findOne(userDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid email or password' });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Invalid email or password' });
  }
}
