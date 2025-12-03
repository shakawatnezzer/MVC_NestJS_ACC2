import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsNumber, IsOptional, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateJournalEntryInput {
  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  debit: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  credit: number;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  account: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;
}