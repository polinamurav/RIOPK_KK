import { RoleDto, SystemDirectory } from '.';

export class ClientData {
  constructor(public clientInfo: ClientInfo, public roles: RoleDto[]) {}
}
export class ClientInfo {
  constructor(
    public login: Field,
    public lastName: Field,
    public name: Field,
    public patronymic: Field,
    public email: Field,
    public branch: Field,
    public department: Field
  ) {}
}

export class Field {
  constructor(
    public placeholder: string,
    public typeField: string,
    public value: string | number | SystemDirectory,
    public type?: string,
    public autosize?: string
  ) {}
}
