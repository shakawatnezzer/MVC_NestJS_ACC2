import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';  
import { UserType } from './user.type';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.schema';

@Resolver(() => UserType)
export class UsersResolver {
  
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => String)
  id(@Parent() user: User) {
    return user._id.toString();
  }

  @Query(() => [UserType], { name: 'getAllUsers' })
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(() => UserType, { nullable: true })
  async getUserById(@Args('id', { type: () => String }) id: string): Promise<User | null> {
    return await this.usersService.findById(id);
  }

  @Query(() => UserType, { nullable: true })
  async getUserByEmail(@Args('email') email: string): Promise<User | null> {
    return await this.usersService.findByEmail(email);
  }

  @Mutation(() => UserType, { description: 'Register a new user' })
  async registerUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('userId') userId: string): Promise<boolean> {
    await this.usersService.delete(userId);
    return true;
  }
}