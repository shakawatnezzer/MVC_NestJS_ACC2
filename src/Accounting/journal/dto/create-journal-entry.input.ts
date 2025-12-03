import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId, IsNumber, Min, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class CreateJournalEntryInput {
  @Field()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @Field(() => Float)
  @IsNumber({}, { message: 'debit  must be a  number' })
  @Min(0, { message: 'debit amount must be zero ' })
  debit: number;

  @Field(() => Float)
  @IsNumber({}, { message: 'credit  must be a  number' })
  @Min(0, { message: 'credit amount must be zero or ' })
  credit: number;

  @Field()
  @IsNotEmpty({ message: 'account ID is required' })
  @IsMongoId({ message: 'invalid account ID format' })
  account: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString({}, { message: 'Date must be a valid ISO string' })
  date?: Date;
}