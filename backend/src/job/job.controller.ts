import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { Job, JobDocument } from './job.schema';
import { JobService } from './job.service'; // ✅ Import JobService

@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService, // ✅ Inject JobService
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
  ) {}

  // Freelancers place bids
  @UseGuards(AuthGuard('jwt'))
  @Post('bid/:id')
  async placeBid(
    @Param('id') jobId: string,
    @Body('userId') userId: string,
    @Body('amount') amount: number,
    @Body('proposal') proposal: string
  ) {
    return this.jobModel.findByIdAndUpdate(
      jobId,
      { $push: { bids: { userId, amount, proposal } } },
      { new: true }
    );
  }

  // 🔍 Get all bids for a job (Client can view)
  @Get('bids/:id')
  async getBids(@Param('id') jobId: string) {
    const job = await this.jobModel.findById(jobId);
    return job?.bids || [];
  }

  // ✅ Accept a bid
  @UseGuards(AuthGuard('jwt'))
  @Post('accept-bid/:id')
  async acceptBid(@Param('id') jobId: string, @Body('userId') userId: string) {
    return this.jobModel.findByIdAndUpdate(jobId, { status: 'in_progress' }, { new: true });
  }

  // ✅ Use `jobService` for AI-driven recommendations
  @Get('recommend-freelancers/:jobId')
  async recommendFreelancers(@Param('jobId') jobId: string) {
    return this.jobService.recommendFreelancers(jobId); // ✅ Now it works
  }
}
