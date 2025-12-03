import { ObjectType, Field, Float } from '@nestjs/graphql';
import { AccountBalanceOutput } from './account-balance.output';

@ObjectType()
export class BalanceSheetOutput {
  @Field(() => [AccountBalanceOutput])
  assets: AccountBalanceOutput[];

  @Field(() => [AccountBalanceOutput])
  liabilities: AccountBalanceOutput[];

  @Field(() => [AccountBalanceOutput])
  equity: AccountBalanceOutput[];

  @Field(() => Float)
  totalAssets: number;

  @Field(() => Float)
  totalLiabilities: number;

  @Field(() => Float)
  totalEquity: number;

  @Field()
  asOfDate: Date;

  @Field(() => Float)
  balanceCheck: number;
}