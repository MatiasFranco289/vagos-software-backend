import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";

class UserState extends Model {
  declare id: number;
  name: string;
}

UserState.init(
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
    tableName: "user_states",
  }
);

export default UserState;
