import { DataTypes, Model, Optional } from "sequelize";
import { ProjectStatusAttributes } from "../interfaces";
import sequelize from "../config/dbConnection";

interface ProjectStatusCreationAttributes
  extends Optional<ProjectStatusAttributes, "id"> {}

class ProjectStatus
  extends Model<ProjectStatusAttributes, ProjectStatusCreationAttributes>
  implements ProjectStatusAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProjectStatus.init(
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
  { sequelize, tableName: "project_status", underscored: true }
);

export default ProjectStatus;
