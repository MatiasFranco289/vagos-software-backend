import User from "../models/User";
import Role from "../models/Role";
import Project from "../models/Project";
import ProjectStatus from "../models/ProjectStatus";
import Tag from "../models/Tag";

export default async function createAssociations() {
  User.belongsTo(Role, {
    foreignKey: "roleId",
    as: "role",
  });

  Role.hasMany(User, {
    foreignKey: "roleId",
    as: "users",
  });

  Project.belongsTo(ProjectStatus, {
    foreignKey: "statusId",
    as: "status",
  });

  ProjectStatus.hasMany(Project, {
    foreignKey: "statusId",
    as: "projects",
  });

  Project.belongsToMany(Tag, {
    through: "project_tag",
  });

  Tag.belongsToMany(Project, {
    through: "project_tag",
  });
}
