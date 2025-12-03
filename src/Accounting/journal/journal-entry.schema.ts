// Accounting/journal/journal-entry.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ObjectType, Field, Float, ID } from '@nestjs/graphql';

export type JournalEntryDocument = HydratedDocument<JournalEntry>;

@ObjectType()
@Schema({ timestamps: true })
export class JournalEntry {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'Account', required: true, index: true })
  account: Types.ObjectId;

  @Field()
  @Prop({ required: true, trim: true })
  description: string;

  @Field(() => Float)
  @Prop({ required: true, min: 0, default: 0 })
  debit: number;

  @Field(() => Float)
  @Prop({ required: true, min: 0, default: 0 })
  credit: number;

  @Field()
  @Prop({ type: Date, default: () => new Date() })
  date: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const JournalEntrySchema = SchemaFactory.createForClass(JournalEntry);