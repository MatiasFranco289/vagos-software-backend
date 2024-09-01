import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import { BlogAttributes } from "../interfaces";
import Project from "./Project";
import sequelize from "../config/dbConnection";
import User from "./User";

export interface BlogCreationAttributes
  extends Optional<BlogAttributes, "id"> {}

class Blog
  extends Model<BlogAttributes, BlogCreationAttributes>
  implements BlogAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public projectId!: ForeignKey<Project["id"]>;
  public userId!: ForeignKey<User["id"]>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "blogs",
    underscored: true,
  }
);

export default Blog;
