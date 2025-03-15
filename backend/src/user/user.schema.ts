import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Adds createdAt and updatedAt
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) // Default role is 'user'
  role: string;

  @Prop()
  name: string; // Full Name

  @Prop()
  bio: string; // Short Bio

  @Prop([String])
  skills: string[]; // List of skills

  @Prop()
  profilePicture: string; // Profile Picture URL
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
