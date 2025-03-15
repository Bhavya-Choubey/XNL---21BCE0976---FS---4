import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Freelancer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  skills: string[];

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: [] })
  completedJobs: string[];
}

export type FreelancerDocument = Freelancer & Document; // ✅ Export FreelancerDocument
export const FreelancerSchema = SchemaFactory.createForClass(Freelancer);
