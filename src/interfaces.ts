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
  statusId: number;
}

export interface TagAttributes {
  id: number;
  name: string;
}

export interface UserStatusAttributes {
  id: number;
  name: string;
}

export interface ProjectStatusAttributes {
  id: number;
  name: string;
}

export interface ProjectAttributes {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  startDate: string;
  endDate: string;
  statusId: number;
  repositoryUrl: string;
}

export interface ResourceTypeAttributes {
  id: number;
  name: string;
}

export interface ResourceAttributes {
  id: number;
  url: string;
  typeId: number;
  projectId: number;
}

export interface BoardAttributes {
  id: number;
  title: string;
  projectId: number;
}
