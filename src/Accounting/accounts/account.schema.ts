
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export type AccountDocument = HydratedDocument<Account>;

export enum AccountType {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE'
}

registerEnumType(AccountType, {
  name: 'AccountType',
  description: 'The type of account',
});

@ObjectType()
@Schema({ timestamps: true })
export class Account {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true, trim: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true, trim: true })
  code: string;

  @Field(() => AccountType)
  @Prop({
    required: true,
    enum: AccountType,
  })
  type: AccountType;

  @Field()
  @Prop({ default: true })
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);