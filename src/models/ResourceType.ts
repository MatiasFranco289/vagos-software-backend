import { DataTypes, Model, Optional } from "sequelize";
import { ResourceTypeAttributes } from "../interfaces";
import sequelize from "../config/dbConnection";

interface ResourceTypeCreationAttributes
  extends Optional<ResourceTypeAttributes, "id"> {}

class ResourceType
  extends Model<ResourceTypeAttributes, ResourceTypeCreationAttributes>
  implements ResourceTypeAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      unique: true,
    },
  },
  { sequelize, tableName: "resource_types", underscored: true }
);

export default ResourceType;
