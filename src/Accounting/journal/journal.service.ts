
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JournalEntry, JournalEntryDocument } from './journal-entry.schema';
import { CreateJournalEntryInput } from './dto/create-journal-entry.input';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(JournalEntry.name) 
    private journalEntryModel: Model<JournalEntryDocument>
  ) {}

  async create(createJournalEntryInput: CreateJournalEntryInput): Promise<JournalEntry> {
    const createdEntry = new this.journalEntryModel(createJournalEntryInput);
    return createdEntry.save();
  }

  async findAll(): Promise<JournalEntry[]> {
    return this.journalEntryModel.find().lean().exec();
  }

  async findByAccount(accountId: string): Promise<JournalEntry[]> {
    return this.journalEntryModel.find({ account: accountId }).lean().exec();
  }

  async deleteAll(): Promise<{ deletedCount: number }> {
    const result = await this.journalEntryModel.deleteMany({}).exec();
    return { deletedCount: result.deletedCount };
  }
}