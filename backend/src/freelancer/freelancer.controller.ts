import { Controller, Get, Param } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';

@Controller('freelancer')
export class FreelancerController {
  constructor(private freelancerService: FreelancerService) {}

  @Get('recommend-jobs/:freelancerId')
  async recommendJobs(@Param('freelancerId') freelancerId: string) {
    return this.freelancerService.recommendJobs(freelancerId);
  }
}
