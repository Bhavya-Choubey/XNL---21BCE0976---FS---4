import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAI } from 'openai';
import { AIMatchingService } from './ai-matching.service';
import { Job, JobSchema } from '../job/job.schema';
import { Freelancer, FreelancerSchema } from '../freelancer/freelancer.schema';
import { JobModule } from '../job/job.module';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { AIMatchingController } from './ai-matching.controller';

@Module({
  imports: [
    forwardRef(() => JobModule), // ✅ Use forwardRef to avoid circular dependency
    forwardRef(() => FreelancerModule), // ✅ Use forwardRef if needed
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: Freelancer.name, schema: FreelancerSchema },
    ]),
  ],
  controllers: [AIMatchingController],
  providers: [
    AIMatchingService,
    {
      provide: OpenAI,
      useValue: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
    },
  ],
  exports: [AIMatchingService],
})
export class AiMatchingModule {}
