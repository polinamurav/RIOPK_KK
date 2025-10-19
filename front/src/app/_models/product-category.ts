import { UserModel } from '.';

export class ProductCategory {
  active: boolean;
  code: string;
  created: string;
  deactivated: string;
  id: number;
  name: string;
  updated: string;
  userCreatedProduct?: UserModel;
  userDeactivatedProduct?: UserModel;
}
