import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { AuthJwtPayload } from '../types/auth-jwtPayload';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private readonly refrshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refrshJwtConfiguration.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  // authorization: Bearer sldfk;lsdkf'lskald'sdkf;sdl

  validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    const userId = payload.sub;
    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
