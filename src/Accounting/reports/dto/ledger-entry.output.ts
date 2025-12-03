import { ObjectType, Field, Float, ID } from '@nestjs/graphql';

@ObjectType()
export class LedgerEntryOutput {
  @Field(() => ID)
  id: string;

  @Field()
  date: Date;

  @Field()
  description: string;

  @Field(() => Float)
  debit: number;

  @Field(() => Float)
  credit: number;

  @Field(() => Float)
  balance: number;

  @Field()
  accountName: string;

  @Field()
  accountId: string;
}