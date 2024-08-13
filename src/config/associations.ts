import User from "../models/User";
import Role from "../models/Role";
import Project from "../models/Project";
import ProjectStatus from "../models/ProjectStatus";
import Tag from "../models/Tag";
import Resource from "../models/Resource";
import ResourceType from "../models/ResourceType";
import Board from "../models/Board";

export default async function createAssociations() {
  User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "role",
  });

  Role.hasMany(User, {
    foreignKey: "role_id",
    as: "users",
  });

  Resource.belongsTo(ResourceType, {
    foreignKey: "type_id",
    as: "type",
  });

  ResourceType.hasMany(Resource, {
    foreignKey: "type_id",
    as: "resources",
  });

  Project.belongsTo(ProjectStatus, {
    foreignKey: "status_id",
    as: "status",
  });

  ProjectStatus.hasMany(Project, {
    foreignKey: "status_id",
    as: "projects",
  });

  Project.belongsToMany(Tag, {
    through: "project_tag",
  });

  Tag.belongsToMany(Project, {
    through: "project_tag",
  });

  Project.hasMany(Resource, {
    foreignKey: "project_id",
    as: "resources",
  });

  Resource.belongsTo(Project, {
    foreignKey: "project_id",
    as: "project",
  });

  Project.hasOne(Board, {
    foreignKey: "project_id",
    as: "project",
  });

  Board.belongsTo(Project, {
    foreignKey: "project_id",
    as: "board",
  });
}
