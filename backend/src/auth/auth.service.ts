import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/user.schema';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService, // ✅ Inject ConfigService
    private usersService: UsersService,  // ✅ Inject UsersService
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return false; // User not found
  
    const isPasswordValid = await this.validatePassword(password, user.password);
    return isPasswordValid;
  }  

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateToken(email: string): Promise<string> {
    return this.jwtService.sign(
      { email },
      {
        secret: this.configService.get<string>('JWT_SECRET'), // ✅ Uses secret from .env
        expiresIn: '1h', // ✅ Token valid for 1 hour
      },
    );
  }
}
