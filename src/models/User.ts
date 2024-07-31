import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";
import Role from "./Role";
import UserState from "./UserState";

class User extends Model {
  declare id: number;
  declare roleId: number;
  declare stateId: number;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      field: 'role_id',
      references: {
        model: Role,
        key: 'id',
      }
    },
    stateId: {
      type: DataTypes.INTEGER,
      field: 'state_id',
      references: {
        model: UserState,
        key: 'id',
      },
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
    profilePicture: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
