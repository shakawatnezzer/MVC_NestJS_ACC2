import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength, Matches, IsOptional, IsIn } from 'class-validator';

@InputType()
export class CreateUserInput {

  @Field()
  @IsNotEmpty()
  fullName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8, { message: 'Password must be at least 8 characters long' }) 
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/(?=.*[@$!%*?&^#()_\-+=<>])/, { message: 'Password must contain at least one special character' })
  password: string;

  @Field({ nullable: true, defaultValue: 'VIEWER' })
  @IsOptional()
  @IsIn(['VIEWER', 'ADMIN'])
  role?: string;
}
