import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   secretOrKey: 'qwerty12345',
    // });
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return String(req?.cookies?.access_token) || null;
        },
      ]),
      secretOrKey: 'qwerty12345',
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.userService.findUserById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
