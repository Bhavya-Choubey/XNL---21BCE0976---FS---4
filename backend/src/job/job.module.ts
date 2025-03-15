import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job, JobSchema } from './job.schema';
import { AiMatchingModule } from '../ai-matching/ai-matching.module'; // ✅ Import AiMatchingModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    forwardRef(() => AiMatchingModule), // ✅ Use forwardRef to prevent circular dependency
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
