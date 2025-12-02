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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    
    
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Account.name, schema: AccountSchema },]),

    
    
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
  providers: [AppService, UsersResolver, UsersService, AccountsResolver, AccountsService],
})
export class AppModule {}