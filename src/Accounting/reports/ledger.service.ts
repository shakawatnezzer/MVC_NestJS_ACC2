import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JournalEntry, JournalEntryDocument } from '../journal/journal-entry.schema';
import { Account, AccountDocument, AccountType,  } from '../accounts/account.schema';
import { LedgerFilterInput } from './dto/ledger-filter.input';
import { LedgerEntryOutput } from './dto/ledger-entry.output';
import { BalanceSheetOutput } from './dto/balance-sheet.output';
import { AccountBalanceOutput } from './dto/account-balance.output';

@Injectable()
export class LedgerService {
  constructor(
    @InjectModel(JournalEntry.name) 
    private journalEntryModel: Model<JournalEntryDocument>,
    @InjectModel(Account.name) 
    private accountModel: Model<AccountDocument>,
  ) {}

  async getLedger(filter?: LedgerFilterInput): Promise<LedgerEntryOutput[]> {
    const query: any = {};

    if (filter?.account) {
      query.account = filter.account;
    }

    if (filter?.startDate || filter?.endDate) {
      query.date = {};
      if (filter.startDate) {
        query.date.$gte = filter.startDate;
      }
      if (filter.endDate) {
        query.date.$lte = filter.endDate;
      }
    }

    const entries = await this.journalEntryModel
      .find(query)
      .populate('account')
      .sort({ date: 1, createdAt: 1 })
      .exec();

    let runningBalance = 0;
    const ledgerEntries: LedgerEntryOutput[] = [];

    for (const entry of entries) {
      const account = entry.account as any;
      runningBalance += entry.debit - entry.credit;

      ledgerEntries.push({
        id: entry._id.toString(),
        date: entry.date,
        description: entry.description,
        debit: entry.debit,
        credit: entry.credit,
        balance: runningBalance,
        accountName: account.name,
        accountId: account._id.toString(),
      });
    }

    return ledgerEntries;
  }

  async getBalanceSheet(asOfDate?: Date): Promise<BalanceSheetOutput> {
    const date = asOfDate || new Date();
    
    const accounts = await this.accountModel.find().exec();

    const entries = await this.journalEntryModel
      .find({ date: { $lte: date } })
      .populate('account')
      .exec();

    const accountBalances = new Map<string, number>();

    for (const entry of entries) {
      const accountId = (entry.account as any)._id.toString();
      const currentBalance = accountBalances.get(accountId) || 0;
      accountBalances.set(accountId, currentBalance + entry.debit - entry.credit);
    }

    const assets: AccountBalanceOutput[] = [];
    const liabilities: AccountBalanceOutput[] = [];
    const equity: AccountBalanceOutput[] = [];

    let totalAssets = 0;
    let totalLiabilities = 0;
    let totalEquity = 0;

    for (const account of accounts) {
      const balance = accountBalances.get(account._id.toString()) || 0;
      
      const accountBalance: AccountBalanceOutput = {
        accountId: account._id.toString(),
        accountName: account.name,
        accountType: account.type,
        balance: balance,
      };

      switch (account.type) {
        case AccountType.ASSET:
          assets.push(accountBalance);
          totalAssets += balance;
          break;
        case AccountType.LIABILITY:
          liabilities.push(accountBalance);
          totalLiabilities += Math.abs(balance);
          break;
        case AccountType.EQUITY:
        case AccountType.REVENUE:
        case AccountType.EXPENSE:
          equity.push(accountBalance);
          totalEquity += balance;
          break;
      }
    }

    const balanceCheck = totalAssets - (totalLiabilities + totalEquity);

    return {
      assets,
      liabilities,
      equity,
      totalAssets,
      totalLiabilities,
      totalEquity,
      asOfDate: date,
      balanceCheck: Math.abs(balanceCheck) < 0.01 ? 0 : balanceCheck,
    };
  }

  async getAccountLedger(
    accountId: string, 
    startDate?: Date, 
    endDate?: Date
  ): Promise<LedgerEntryOutput[]> {
    return this.getLedger({
      account: accountId,
      startDate,
      endDate,
    });
  }
}