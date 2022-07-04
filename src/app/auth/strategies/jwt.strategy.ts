import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayloadData } from '@app/auth/commands/jwt.data';
import { User } from '@app/user/commands/user.data';
import { UserNotFoundException } from '@app/user/user.errors';
import { UserService } from '@app/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY', ''),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayloadData): Promise<User> {
    try {
      return this.userService.findById(payload.user_id);
    } catch (e) {
      if (e instanceof UserNotFoundException) {
        throw new UnauthorizedException();
      }
      throw new BadRequestException();
    }
  }
}