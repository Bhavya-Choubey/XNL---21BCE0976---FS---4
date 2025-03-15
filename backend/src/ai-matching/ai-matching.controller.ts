import { Controller, Get, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AIMatchingService } from './ai-matching.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ai-matching') 
export class AIMatchingController {
  constructor(private aiMatchingService: AIMatchingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('recommend-jobs/:freelancerId') 
  async getJobRecommendations(@Param('freelancerId') freelancerId: string, @Req() req) {
    console.log('🛑 Authorization Header:', req.headers.authorization); // Debugging
    if (!req.user) {
      throw new UnauthorizedException('JWT Token Invalid or Expired');
    }
    return this.aiMatchingService.getJobRecommendations(freelancerId);
  }
}
