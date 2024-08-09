import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";
import ResourceType from "./ResourceType";

class Resource extends Model {
  declare id: number;
  declare resourceTypeId: number;
  url: string;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    resourceTypeId: {
      type: DataTypes.INTEGER,
      field: "resource_type_id",
      references: {
        model: ResourceType,
        key: "id",
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "resources",
  }
);

export default Resource;
