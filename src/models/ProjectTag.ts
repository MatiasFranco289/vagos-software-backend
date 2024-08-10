import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  Model,
} from "sequelize";
import sequelize from "../config/databaseConnection";
import Project from "./Project";

class ProjectTag extends Model {
  declare id: number;
  declare addProject: HasManyAddAssociationMixin<Project, number>;
  declare static associations: { bs: Association<ProjectTag, Project> };
  name: string;
}

ProjectTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "project_tags",
  }
);

export default ProjectTag;
