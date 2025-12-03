// Accounting/accounts/accounts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';
import { CreateAccountInput } from './dto/create-account.input';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) 
    private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountInput: CreateAccountInput): Promise<Account> {
    const createdAccount = new this.accountModel(createAccountInput);
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async findByType(type: string): Promise<Account[]> {
    return this.accountModel.find({ type }).exec();
  }

  async findByCode(code: string): Promise<Account | null> {
    return this.accountModel.findOne({ code }).exec();
  }

  async update(id: string, updateData: Partial<CreateAccountInput>): Promise<Account> {
    const account = await this.accountModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async delete(id: string): Promise<Account> {
    const account = await this.accountModel.findByIdAndDelete(id).exec();
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }
}