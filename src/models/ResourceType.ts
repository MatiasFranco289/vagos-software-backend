import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";

class ResourceType extends Model {
  declare id: number;
  name: string;
}

ResourceType.init(
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
    tableName: "resourceTypes",
  }
);

export default ResourceType;
