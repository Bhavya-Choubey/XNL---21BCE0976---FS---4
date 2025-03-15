import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    return { email: body.email, password: hashedPassword };
  }

  @Post('login')
async login(@Body('email') email: string, @Body('password') password: string) {
  return this.authService.validateUser(email, password);
}
}
