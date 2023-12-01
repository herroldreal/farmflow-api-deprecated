import * as process from 'process';

export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: true,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',
    sa_key: process.env.SA_KEY || '',
    project_id: process.env.PROJECT_ID || '',
    client_email: process.env.CLIENT_EMAIL || '',
    private_key: process.env.PRIVATE_KEY || '',
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true,
  },
  foo: 'dev-bar',
};
