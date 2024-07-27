import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";

class ProjectTag extends Model {
  declare id: number;
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
    },
  },
  {
    sequelize,
    tableName: "project_tags",
  }
);

export default ProjectTag;
