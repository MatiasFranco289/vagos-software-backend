import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import { ProjectAttributes } from "../interfaces";
import ProjectStatus from "./ProjectStatus";
import sequelize from "../config/dbConnection";

interface ProjectCreationAtributes extends Optional<ProjectAttributes, "id"> {}

class Project
  extends Model<ProjectAttributes, ProjectCreationAtributes>
  implements ProjectAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public thumbnailUrl!: string;
  public repositoryUrl!: string;
  public statusId: ForeignKey<ProjectStatus["id"]>;
  public startDate!: string;
  public endDate!: string;
  // TODO: Agregar resources a projects
  // TODO: Como va a ser los del tablero?
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repositoryUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "status_id",
      references: {
        model: ProjectStatus,
        key: "id",
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, tableName: "projects", underscored: true }
);

export default Project;
