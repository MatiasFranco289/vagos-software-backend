import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";
import User from "./User";
import Project from "./Project";
import BlogTag from "./BlogTag";

class Blog extends Model {
  declare id: number;
  declare projectId: number;
  declare creatorId: number;
  title: string;
  content: string
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
        references: {
            model: Project,
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "blogs",
  }
);

User.hasMany(Blog);
Blog.belongsTo(User);

Project.hasMany(Blog);
Blog.belongsTo(Project);

Blog.belongsToMany(BlogTag, { through: 'BlogHasTag' });
BlogTag.belongsToMany(Blog, { through: 'BlogHasTag' });

export default Blog;
