import Board from "./models/Board";
import Resource from "./models/Resource";
import Tag from "./models/Tag";
import User from "./models/User";

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
  expectedEndDate: string;
  statusId: number;
  repositoryUrl: string;
  creatorId: number;
  tags?: Array<Tag>;
  resources?: Array<Resource>;
  creator?: User;
  board?: Board;
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

export interface BlogAttributes {
  id: number;
  title: string;
  description: string;
  projectId: number;
  userId: number;
}
