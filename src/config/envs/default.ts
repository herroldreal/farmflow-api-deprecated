import {
  areaMeasureUnitTypeResolver,
  farmPurposeResolver,
  milkMeasureUnitTypeResolver,
  weightMeasurementUnitResolver,
} from '@resolvers/enum.resolver';

export const config = {
  db: {
    // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  },
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    resolvers: {
      AreaMeasurementUnit: areaMeasureUnitTypeResolver,
      MilkMeasurementUnit: milkMeasureUnitTypeResolver,
      WeightMeasurementUnit: weightMeasurementUnitResolver,
      FarmPurpose: farmPurposeResolver,
    },
    autoSchemaFile: true,
    autoTransformHttpErrors: true,
    cors: { credentials: true },
    sortSchema: true,
    installSubscriptionHandlers: true,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
