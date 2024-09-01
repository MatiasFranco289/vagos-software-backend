import { DataTypes, Model, Optional } from "sequelize";
import { UserStatusAttributes } from "../interfaces";
import sequelize from "../config/dbConnection";

export interface UserStatusCreationAttributes
  extends Optional<UserStatusAttributes, "id"> {}

class UserStatus
  extends Model<UserStatusAttributes, UserStatusCreationAttributes>
  implements UserStatusAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserStatus.init(
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
    tableName: "user_status",
    underscored: true,
  }
);

export default UserStatus;
