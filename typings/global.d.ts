import type { Payload } from '../src/auth';

export declare global {
  type AnyObject = Record<string, unknown>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;

      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;

      SA_KEY: string;
      PROJECT_ID: string;
      PRIVATE_KEY: string;
      CLIENT_EMAIL: string;
      AUDIENCE: string;
      ISSUER: string;

      FUNCTIONS_EMULATOR: boolean;

      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;

      MAIL_API_KEY: string;
    }
  }

  namespace Express {
    interface Request {
      customProps: object;
      user?: User;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends Payload {}
  }
}
