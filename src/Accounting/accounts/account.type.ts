import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AccountType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  type: string;

  @Field()
  isActive: boolean;
}
