import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";
import ProjectState from "./ProjectState";
import User from "./User";

class Project extends Model {
  declare id: number;
  declare stateId: number;
  declare creatorId: number;
  name: string;
  content: Text;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stateId: {
        type: DataTypes.INTEGER,
        field: 'state_id',
        references: {
          model: ProjectState,
          key: 'id'
        }
    },
    creatorId: {
        type: DataTypes.INTEGER,
        field: 'creator_id',
        references: {
          model: User,
          key: 'id'
        }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "projects",
  }
);

export default Project;
