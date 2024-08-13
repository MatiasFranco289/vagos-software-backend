import { DataTypes, Model, Optional } from "sequelize";
import { TagAttributes } from "../interfaces";
import sequelize from "../config/dbConnection";

interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

class Tag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tag.init(
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
  { sequelize, tableName: "tags", underscored: true }
);

export default Tag;
