import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class AccountBalanceOutput {
  @Field()
  accountId: string;

  @Field()
  accountName: string;

  @Field()
  accountType: string;

  @Field(() => Float)
  balance: number;
}