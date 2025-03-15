import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Freelancer, FreelancerDocument } from './freelancer.schema';
import { AIMatchingService } from '../ai-matching/ai-matching.service'; // ✅ Import AI Matching

@Injectable()
export class FreelancerService {
  constructor(
    @InjectModel(Freelancer.name) private freelancerModel: Model<FreelancerDocument>,
    private aiMatchingService: AIMatchingService, // ✅ Inject AI Matching Service
  ) {}

  async recommendJobs(freelancerId: string) {
    return this.aiMatchingService.getJobRecommendations(freelancerId); // ✅ Use AI to get job recommendations
  }
}
