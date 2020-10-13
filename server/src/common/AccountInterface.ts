export interface AccountInterface {
  id?: AccountId;
  email: string,
  name: string,
  password: string,

}

export type AccountId = string;
