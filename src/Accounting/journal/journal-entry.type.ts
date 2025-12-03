import { ObjectType, Field, ID, Float, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class JournalEntryType {
  @Field(() => ID)
  id: string;

  @Field()
  description: string;

  @Field(() => Float)
  debit: number;

  @Field(() => Float)
  credit: number;

  @Field(() => GraphQLISODateTime)
  date: Date;

  @Field()
  account: string; 
   @Field({ nullable: true })
  createdAt?: Date;   

  @Field({ nullable: true })
  updatedAt?: Date;
}
