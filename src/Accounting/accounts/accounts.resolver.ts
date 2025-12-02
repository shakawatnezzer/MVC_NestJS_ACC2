import { Resolver, Mutation, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { CreateAccountInput } from './dto/create-account.input';
import { AccountType } from './account.type';


@Resolver(() => AccountType)
export class AccountsResolver {
  constructor(
    private readonly accountsService: AccountsService,
  ) {}

  @Query(() => AccountType, { nullable: true })
  async account(@Args('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Query(() => [AccountType])
  async accounts() {
    return this.accountsService.findAll();
  }

  @Mutation(() => AccountType)
  async createAccount(@Args('input') input: CreateAccountInput) {
    return this.accountsService.create(input);
  }

  @ResolveField()
  async isActive(@Parent() account: AccountType) {
    return account.isActive;
  }

  @ResolveField()
  async type(@Parent() account: AccountType) {
    return account.type;
  }
}