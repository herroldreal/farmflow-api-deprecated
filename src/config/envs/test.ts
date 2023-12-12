// export * from './development';
import {
  areaMeasureUnitTypeResolver,
  farmPurposeResolver,
  milkMeasureUnitTypeResolver,
  weightMeasurementUnitResolver,
} from '@resolvers/enum.resolver';

export const config = {
  db: {
    type: 'mysql',
    synchronize: false,
    logging: false,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',
    extra: {
      connectionLimit: 5,
    },
    autoLoadEntities: true,
  },
  graphql: {
    playground: false,
    resolvers: {
      AreaMeasurementUnit: areaMeasureUnitTypeResolver,
      MilkMeasurementUnit: milkMeasureUnitTypeResolver,
      WeightMeasurementUnit: weightMeasurementUnitResolver,
      FarmPurpose: farmPurposeResolver,
    },
  },
};
