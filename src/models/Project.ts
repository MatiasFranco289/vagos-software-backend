import {
  Association,
  DataTypes,
  HasMany,
  HasManyAddAssociationMixin,
  Model,
} from "sequelize";
import sequelize from "../config/databaseConnection";
import ProjectState from "./ProjectState";
import User from "./User";
import Resource from "./Resource";
import ProjectTag from "./ProjectTag";

class Project extends Model {
  declare id: number;
  declare stateId: number;
  declare creatorId: number;
  declare addResource: HasManyAddAssociationMixin<Resource, number>;
  declare addProjectTag: HasManyAddAssociationMixin<ProjectTag, number>;
  declare static associations: {
    resource: Association<Project, Resource>;
    tag: Association<Project, ProjectTag>;
  };
  startDate: Date;
  endDate: Date;
  image: string;
  name: string;
  content: Text;
  isActive: boolean;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stateId: {
      type: DataTypes.INTEGER,
      field: "state_id",
      references: {
        model: ProjectState,
        key: "id",
      },
    },
    creatorId: {
      type: DataTypes.INTEGER,
      field: "creator_id",
      references: {
        model: User,
        key: "id",
      },
    },
    startDate: {
      type: DataTypes.DATE,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATE,
      field: "end_date",
    },
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: "is_active",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "projects",
  }
);

export default Project;
