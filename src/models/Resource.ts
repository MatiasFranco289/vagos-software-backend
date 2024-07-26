import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";
import ResourceType from "./ResourceType";

class Resource extends Model {
  declare id: number;
  declare typeId: number;
  url: string;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    typeId: {
        type: DataTypes.INTEGER,
        references: {
            model: ResourceType,
            key: 'id'
        }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "resources",
  }
);

ResourceType.hasMany(Resource);
Resource.belongsTo(ResourceType);

export default Resource;
