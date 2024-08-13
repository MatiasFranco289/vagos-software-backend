import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import sequelize from "../config/dbConnection";
import { ResourceAttributes } from "../interfaces";
import ResourceType from "./ResourceType";
import Project from "./Project";

interface ResourceCreationAttributes
  extends Optional<ResourceAttributes, "id"> {}

class Resource
  extends Model<ResourceAttributes, ResourceCreationAttributes>
  implements ResourceAttributes
{
  public id!: number;
  public url!: string;
  public typeId!: ForeignKey<ResourceType["id"]>;
  public projectId!: ForeignKey<Project["id"]>;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: ResourceType,
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
  },
  { sequelize, tableName: "resources", underscored: true }
);

export default Resource;
