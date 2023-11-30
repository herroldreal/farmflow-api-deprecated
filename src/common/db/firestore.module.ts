import {
  FirestoreDatabaseProvider,
  FirestoreOptionsProvider,
  FirestoreCollectionProviders,
} from '@common/db/firestore.provider';
import { Firestore, Settings } from '@google-cloud/firestore';
import { Module, DynamicModule } from '@nestjs/common';

interface FirestoreModuleOptions {
  imports: any[];
  inject: any[];
  useFactory: (...args: any[]) => Settings;
}

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionProvider = {
      provide: FirestoreOptionsProvider,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    const dbProvider = {
      provide: FirestoreDatabaseProvider,
      useFactory: (config) => new Firestore(config),
      inject: [FirestoreOptionsProvider],
    };
    const collectionProviders = FirestoreCollectionProviders.map((providerName) => ({
      provide: providerName,
      useFactory: (db) => db.collection(providerName),
      inject: [FirestoreDatabaseProvider],
    }));

    return {
      global: true,
      module: FirestoreModule,
      imports: options.imports,
      providers: [optionProvider, dbProvider, ...collectionProviders],
      exports: [dbProvider, ...collectionProviders],
    };
  }
}
