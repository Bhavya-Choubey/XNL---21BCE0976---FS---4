import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';

@Controller('user')
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // ✅ Get user profile
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.userModel.findById(req.user.id).select('-password');
    return { message: 'User profile fetched', user };
  }

  // ✅ Update user profile
  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  async updateProfile(@Req() req, @Body() updateData: Partial<User>) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, select: '-password' }
    );
    return { message: 'Profile updated', user: updatedUser };
  }
}
