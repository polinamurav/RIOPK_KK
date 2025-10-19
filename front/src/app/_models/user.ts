export class UserModel {
  active: boolean;
  created: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  middleName: string;
  passwordResetDate: string;
  updated: string;
  username: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
