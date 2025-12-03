import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsMongoId, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class LedgerFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId()
  account?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;
}