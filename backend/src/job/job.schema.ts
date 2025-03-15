import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  clientId: string; // ID of the client posting the job

  @Prop({ default: 'open' }) // open, in_progress, completed
  status: string;

  @Prop({ type: [{ userId: String, amount: Number, proposal: String }] }) // Store bids
  bids: { userId: string; amount: number; proposal: string }[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
export type JobDocument = Job & Document;
