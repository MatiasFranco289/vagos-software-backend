import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";
import ProjectState from "./ProjectState";
import ProjectTag from "./ProjectTag";
import User from "./User";

class Project extends Model {
  declare id: number;
  declare stateId: number;
  declare creatorId: number;
  name: string;
  content: string;
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
        references: {
            model: ProjectState,
            key: 'id'
        }
    },
    creatorId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "projects",
  }
);

User.hasMany(Project);
Project.belongsTo(User);

ProjectState.hasMany(Project);
Project.belongsTo(ProjectState);

Project.belongsToMany(ProjectTag, { through: 'ProjectHasTag' });
ProjectTag.belongsToMany(Project, { through: 'ProjectHasTag' });

export default Project;
