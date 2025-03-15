import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FreelancerController } from './freelancer.controller';
import { FreelancerService } from './freelancer.service';
import { Freelancer, FreelancerSchema } from './freelancer.schema';
import { AiMatchingModule } from '../ai-matching/ai-matching.module'; // ✅ Import AiMatchingModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Freelancer.name, schema: FreelancerSchema }]),
    forwardRef(() => AiMatchingModule), // ✅ Use forwardRef to prevent circular dependency
  ],
  controllers: [FreelancerController],
  providers: [FreelancerService],
  exports: [FreelancerService],
})
export class FreelancerModule {}
