import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";
import User from "./User";
import Project from "./Project";

class Blog extends Model {
  declare id: number;
  declare projectId: number;
  declare creatorId: number;
  title: string;
  content: Text;
}

Blog.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    projectId: {
        type: DataTypes.INTEGER,
        field: 'project_id',
        references: {
            model: Project,
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "blogs",
  }
);

export default Blog;
