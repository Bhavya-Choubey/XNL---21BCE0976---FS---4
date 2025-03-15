import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EscrowDocument = Escrow & Document;

@Schema({ timestamps: true })
export class Escrow {
  @Prop({ required: true }) 
  jobId: string;

  @Prop({ required: true }) 
  clientId: string;

  @Prop({ required: true }) 
  freelancerId: string;

  @Prop({ required: true, min: 1 }) 
  amount: number;

  @Prop({ default: 'pending' })  // pending, funded, released, refunded
  status: string;
}

export const EscrowSchema = SchemaFactory.createForClass(Escrow);
