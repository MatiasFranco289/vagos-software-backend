import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import Project from "../models/Project";
import { QUERY_LIMIT, STATUS_CODE } from "../constants";
import { checkIfNotFound, getArrayFromCSV, handleError } from "../utils";
import ProjectTag from "../models/ProjectTag";
import { OrderItem } from "sequelize";

export const ProjectController = {
  getProject: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    const { id } = req.params;
    const { order_by } = req.query;

    let response: ApiResponse<Project | null> = {
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
      checkIfNotFound(projects);
    } catch (err) {
      response = handleError(err);
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

    let response: ApiResponse<Project | null> = {
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
      checkIfNotFound(projects);
    } catch (err) {
      response = handleError(err);
    }

    if (projects.length > 1) response.message += "s";
    response.data = projects;

    res.status(response.statusCode).json(response);
  },
};
