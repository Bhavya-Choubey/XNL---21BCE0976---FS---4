import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { EscrowModule } from './escrow/escrow.module';
import { FreelancerModule } from './freelancer/freelancer.module'; 
import { AiMatchingModule } from './ai-matching/ai-matching.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MongoDB Connection
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017/freelanceDB'),

    AuthModule,

    UserModule,

    JobModule,

    EscrowModule,
    FreelancerModule, // ✅ Add Freelancer Module
    AiMatchingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
