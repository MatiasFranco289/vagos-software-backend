import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";
import User from "./User";
import Blog from "./Blog";

class Comment extends Model {
  declare id: number;
  declare userId: number;
  declare blogId: number;
  declare parentId: number;
  content: string;
  isActive: boolean;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      references: {
        model: User,
        key: "id",
      },
    },
    blogId: {
      type: DataTypes.INTEGER,
      field: "blog_id",
      references: {
        model: Blog,
        key: "id",
      },
    },
    parentId: {
      type: DataTypes.INTEGER,
      field: "parent_id",
      references: {
        model: Comment,
        key: "id",
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: "is_active",
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "comments",
  }
);

export default Comment;
