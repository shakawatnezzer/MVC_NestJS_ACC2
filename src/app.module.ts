import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/user.schema';
import { AccountsResolver } from './Accounting/accounts/accounts.resolver';
import { AccountsService } from './Accounting/accounts/accounts.service';
import { Account, AccountSchema } from './Accounting/accounts/account.schema';
import { JournalResolver } from './Accounting/journal/journal.resolver';
import { JournalService } from './Accounting/journal/journal.service';
import { JournalEntry, JournalEntrySchema } from './Accounting/journal/journal-entry.schema';
import { LedgerResolver } from './Accounting/reports/ledger.resolver';
import { LedgerService } from './Accounting/reports/ledger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    
    
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Account.name, schema: AccountSchema },
      { name: JournalEntry.name, schema: JournalEntrySchema },

    ]),

    
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      csrfPrevention: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    UsersResolver,
    UsersService,
    AccountsResolver, 
    AccountsService, 
    JournalResolver,
    JournalService,
    LedgerResolver,
    LedgerService],
})
export class AppModule {}