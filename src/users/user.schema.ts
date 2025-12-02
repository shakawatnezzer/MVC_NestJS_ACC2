import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ 
  timestamps: true,
  collection: 'users'
})
export class User {
    _id: Types.ObjectId;
  @Prop({ 
    required: true,
    type: String 
  })
  fullName: string;

  @Prop({ 
    required: true,
    unique: true,
    lowercase: true,
    trim: true 
  })
  email: string;

  @Prop({ 
    required: true,
    select: false 
  })
  password: string;

  @Prop({ 
    type: String,
    enum: ['ADMIN', 'ACCOUNTANT', 'VIEWER'],
    default: 'VIEWER' 
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

