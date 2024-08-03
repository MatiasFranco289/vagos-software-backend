import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection";

class BlogTag extends Model {
  declare id: number;
  name: string;
}

BlogTag.init(
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
    tableName: "blog_tags",
  }
);

export default BlogTag;
