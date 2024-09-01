// This file contains roles to be created at server start
import { RoleCreationAttributes } from "../../src/models/Role";

const roles: Array<RoleCreationAttributes> = [
  {
    id: 1,
    name: "ADMIN",
  },
  {
    id: 2,
    name: "USER",
  },
];

export default roles;
