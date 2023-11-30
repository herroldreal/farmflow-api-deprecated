import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { UserRepository } from '@repositories/user.repository';

import { UserService } from './providers';
import { UserResolver } from './resolvers';
import { DateScalar } from './scalars';

/**
 * https://docs.nestjs.com/graphql/quick-start
 */
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        ...config.get<GqlModuleOptions>('graphql'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [UserRepository],
  providers: [UserResolver, UserService, DateScalar, UserRepository],
})
export class GqlModule {}
