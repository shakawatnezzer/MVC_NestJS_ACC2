// Accounting/accounts/accounts.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from './account.schema';
import { CreateAccountInput } from './dto/create-account.input';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => Account)
  async createAccount(
    @Args('input') input: CreateAccountInput,
  ): Promise<Account> {
    return this.accountsService.create(input);
  }

  @Query(() => [Account], { name: 'accounts' })
  async findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Query(() => Account, { name: 'account' })
  async findOne(@Args('id') id: string): Promise<Account> {
    return this.accountsService.findOne(id);
  }
}