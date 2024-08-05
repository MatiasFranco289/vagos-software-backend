import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";

class ProjectState extends Model {
  declare id: number;
  name: string;
  isActive: boolean;
}

ProjectState.init(
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "project_states",
  }
);

export default ProjectState;
