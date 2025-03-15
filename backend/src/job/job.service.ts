import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.schema';
import { AIMatchingService } from '../ai-matching/ai-matching.service'; // ✅ Import AI Matching

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    private aiMatchingService: AIMatchingService, // ✅ Inject AI Matching Service
  ) {}

  async recommendFreelancers(jobId: string) {
    return this.aiMatchingService.getJobRecommendations(jobId); // ✅ Use AI to get freelancer recommendations
  }
}
