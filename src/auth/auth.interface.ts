export interface JwtSign {
  access_token: string;
  refresh_token: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  roles: string[];
}

export interface Account {
  email: string;
  blackListed: boolean;
  name: string;
  roles: string[];
  password: string;
  phone: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface TokenPayload {
  sub: string;
  username: string;
  roles: string[];
}

export interface Payload {
  uid: string;
  email: string;
  name: string;
  roles: string[] | undefined;
}
