// Accounting/journal/journal.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { JournalService } from './journal.service';
import { CreateJournalEntryInput } from './dto/create-journal-entry.input';
import { JournalEntry } from './journal-entry.schema'; 
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class DeleteResult {
  @Field(() => Int)
  deletedCount: number;
}

@Resolver(() => JournalEntry)
export class JournalResolver {
  constructor(private readonly journalService: JournalService) {}

  @Mutation(() => JournalEntry)
  async createJournalEntry(@Args('input') input: CreateJournalEntryInput) {
    return this.journalService.create(input);
  }

  @Query(() => [JournalEntry], { name: 'journalEntries' })
  async journalEntries() {
    return this.journalService.findAll();
  }

  @Query(() => [JournalEntry], { name: 'journalEntriesByAccount' })
  async journalEntriesByAccount(@Args('accountId') accountId: string) {
    return this.journalService.findByAccount(accountId);
  }

  @Mutation(() => DeleteResult)
  async deleteAllJournalEntries(): Promise<{ deletedCount: number }> {
    return this.journalService.deleteAll();
  }
}