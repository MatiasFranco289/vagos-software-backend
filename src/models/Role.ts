import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConnection";
import { RoleAttributes } from "../interfaces";

export interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id"> {}

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
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
  {
    sequelize,
    tableName: "roles",
    underscored: true,
  }
);

export default Role;
