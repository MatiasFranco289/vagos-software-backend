import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";

class Role extends Model {
  declare id: number;
  name: string;
  isActive: boolean
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "roles",
  }
);

export default Role;
