import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import sequelize from "../config/dbConnection";
import { BoardAttributes } from "../interfaces";
import Project from "./Project";

interface BoardCreationAttributes extends Optional<BoardAttributes, "id"> {}

class Board
  extends Model<BoardAttributes, BoardCreationAttributes>
  implements BoardAttributes
{
  public id!: number;
  public title!: string;
  public projectId!: ForeignKey<Project["id"]>;
}

Board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
  },
  { sequelize, tableName: "boards", underscored: true }
);

export default Board;
