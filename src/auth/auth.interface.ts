export interface Account {
  email: string;
  blackListed: boolean;
  name: string;
  roles: string[];
  password: string;
  phone: string;
}

export interface Payload {
  uid: string;
  email: string;
  name: string;
  roles: string[] | undefined;
}
