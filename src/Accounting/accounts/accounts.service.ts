import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';
import { CreateAccountInput } from './dto/create-account.input';



@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(input: CreateAccountInput): Promise<Account> {
    const exists = await this.accountModel.findOne({ code: input.code });

    if (exists) {
      throw new ConflictException('Account code already exists');
    }

    const account = new this.accountModel(input);
    return account.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().sort({ code: 1 }).exec();
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountModel.findById(id).exec();
    
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    
    return account;
  }

  async findByCode(code: string): Promise<Account> {
    const account = await this.accountModel.findOne({ code }).exec();
    
    if (!account) {
      throw new NotFoundException(`Account with code ${code} not found`);
    }
    
    return account;
  }
}