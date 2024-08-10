export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: Array<T>;
}

export interface RoleAttributes {
  id: number;
  name: string;
}

export interface UserAtributes {
  id: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
}
