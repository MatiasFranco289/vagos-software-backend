import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import Project from "../models/Project";
import { QUERY_LIMIT, STATUS_CODE } from "../constants";
import { getArrayFromCSV, getErrorMessages } from "../utils";
import ProjectTag from "../models/ProjectTag";
import { OrderItem } from "sequelize";

export const ProjectController = {
  getProject: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    const { id } = req.params;
    const { order_by } = req.query;

    const response: ApiResponse<Project | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved project",
      data: [],
    };

    let order: OrderItem = ["id", "ASC"];
    if (order_by) {
      if (order_by.toString().includes("ALPH")) order[0] = "name";
      else if (order_by.toString().includes("Date")) order[0] = "startDate";

      if (order_by && order_by.toString().includes("DESC")) order[1] = "DESC";
    }

    let idToFind: Array<string> = getArrayFromCSV(id);
    let projects: Project[];

    try {
      projects = await Project.findAll({
        include: [
          {
            model: ProjectTag,
          },
        ],
        where: {
          id: idToFind,
        },
        order: [order],
      });
    } catch (err) {
      console.log(err);
      response.message = getErrorMessages(err);
      response.statusCode = STATUS_CODE.internalServerError;
    }

    //If nothing was found
    if (projects.length === 0) {
      response.statusCode = STATUS_CODE.notFound;
      response.message =
        "The requested project" +
        (idToFind.length > 1 ? "s were " : " was ") +
        "not found";
    }

    if (projects.length > 1) response.message += "s";
    response.data = projects;

    res.status(response.statusCode).json(response);
  },
  getAllProjects: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    const { order_by } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    const response: ApiResponse<Project | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved project",
      data: [],
    };

    let order: OrderItem = ["id", "ASC"];
    if (order_by) {
      if (order_by.toString().includes("ALPH")) order[0] = "name";
      else if (order_by.toString().includes("DATE")) order[0] = "startDate";

      if (order_by && order_by.toString().includes("DESC")) order[1] = "DESC";
    }

    let projects: Project[];

    try {
      projects = await Project.findAll({
        include: [
          {
            model: ProjectTag,
          },
        ],
        order: [order],
        limit: limit ? parseInt(limit.toString()) : QUERY_LIMIT,
        offset: offset ? parseInt(offset.toString()) : 0,
      });
    } catch (err) {
      console.log(err);
      response.message = getErrorMessages(err);
      response.statusCode = STATUS_CODE.internalServerError;
    }

    //If nothing was found
    if (projects.length === 0) {
      response.statusCode = STATUS_CODE.notFound;
      response.message =
        "The requested project" +
        //(idToFind.length > 1 ? "s were " : " was ") +
        "not found";
    }

    if (projects.length > 1) response.message += "s";
    response.data = projects;

    res.status(response.statusCode).json(response);
  },
};
