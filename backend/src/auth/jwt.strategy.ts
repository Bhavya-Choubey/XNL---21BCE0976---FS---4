import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ Extracts from header
      ignoreExpiration: false, // 🚨 Ensure expired tokens are rejected
      secretOrKey: configService.get<string>('JWT_SECRET'), // ✅ Reads from .env
    });
  }

  async validate(payload: any) {
    console.log('✅ JWT Payload:', payload); // ✅ Debug output
    if (!payload || !payload.email) {
      throw new UnauthorizedException();  // 🚨 Reject invalid tokens
    }
    return { email: payload.email }; // ✅ Ensure payload contains email
  }
}
