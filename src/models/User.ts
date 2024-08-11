import { Model, Optional, DataTypes, ForeignKey } from "sequelize";
import Role from "./Role";
import sequelize from "../config/dbConnection";
import { UserAtributes } from "../interfaces";

interface UserCreationAttributes extends Optional<UserAtributes, "id"> {}

class User
  extends Model<UserAtributes, UserCreationAttributes>
  implements UserAtributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public roleId!: ForeignKey<Role["id"]>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "role_id",
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
