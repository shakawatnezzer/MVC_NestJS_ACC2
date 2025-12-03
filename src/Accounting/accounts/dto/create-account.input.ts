// Accounting/accounts/dto/create-account.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { AccountType } from '../account.schema';

@InputType()
export class CreateAccountInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  code: string;

  @Field(() => AccountType)
  @IsEnum(AccountType)
  type: AccountType;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}