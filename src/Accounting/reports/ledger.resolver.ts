import { Resolver, Query, Args } from '@nestjs/graphql';
import { LedgerService } from './ledger.service';
import { LedgerEntryOutput } from './dto/ledger-entry.output';
import { BalanceSheetOutput } from './dto/balance-sheet.output';
import { LedgerFilterInput } from './dto/ledger-filter.input';

@Resolver()
export class LedgerResolver {
  constructor(private readonly ledgerService: LedgerService) {}

  @Query(() => [LedgerEntryOutput], { name: 'ledger' })
  async getLedger(
    @Args('filter', { nullable: true }) filter?: LedgerFilterInput,
  ): Promise<LedgerEntryOutput[]> {
    return this.ledgerService.getLedger(filter);
  }

  @Query(() => [LedgerEntryOutput], { name: 'accountLedger' })
  async getAccountLedger(
    @Args('accountId') accountId: string,
    @Args('startDate', { nullable: true }) startDate?: Date,
    @Args('endDate', { nullable: true }) endDate?: Date,
  ): Promise<LedgerEntryOutput[]> {
    return this.ledgerService.getAccountLedger(accountId, startDate, endDate);
  }

  @Query(() => BalanceSheetOutput, { name: 'balanceSheet' })
  async getBalanceSheet(
    @Args('asOfDate', { nullable: true }) asOfDate?: Date,
  ): Promise<BalanceSheetOutput> {
    return this.ledgerService.getBalanceSheet(asOfDate);
  }
}