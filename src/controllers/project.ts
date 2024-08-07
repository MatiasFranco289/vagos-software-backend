import { Response, Request } from "express";
import { ApiResponse } from "../interfaces";
import Project from "../models/Project";
import { QUERY_LIMIT, STATUS_CODE } from "../constants";
import {
  checkIfNotFound,
  getArrayFromCSV,
  getJSONfromKeyArray,
  handleError,
  replaceJSONkeys,
} from "../utils";
import { OrderItem } from "sequelize";

export const ProjectController = {
  createProject: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    const { state_id } = req.body;
    const { creator_id } = req.body;
    const { project_start_date } = req.body;
    const { project_end_date } = req.body;
    const { project_name } = req.body;
    const { project_image } = req.body;
    const { project_content } = req.body;

    let response: ApiResponse<Project | null> = {
      statusCode: STATUS_CODE.created,
      message: "Project successfully created",
      data: [],
    };

    try {
      const newProject = await Project.create({
        stateId: state_id,
        creatorId: creator_id,
        startDate: project_start_date,
        endDate: project_end_date,
        name: project_name,
        image: project_image,
        content: project_content,
      });
      response.data = [newProject];
    } catch (err) {
      response = handleError(err);
    }
    res.status(response.statusCode).json(response);
  },
  updateProject: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    const newKeys = {
      state_id: "stateId",
      creator_id: "creatorId",
      project_name: "name",
      project_content: "content",
      project_image: "image",
      project_start_date: "startDate",
      project_end_date: "endDate",
    };

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Project successfully updated",
      data: [],
    };

    const updateParameters = replaceJSONkeys(newKeys, req.body);

    try {
      const updatedProject = await Project.update(updateParameters, {
        where: {
          id: id,
        },
      });
      checkIfNotFound(updatedProject[0]);
      response.data = [updatedProject[0]];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getProject: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<Project | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved Project",
      data: [],
    };

    try {
      const idToFind: Array<string> = getArrayFromCSV(id);
      const projectsInTable = await Project.findAll({
        where: { id: idToFind },
      });
      checkIfNotFound(projectsInTable);
      response.data = projectsInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getAllProjects: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    const { order_by } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    const newKeys = {
      state_id: "stateId",
      creator_id: "creatorId",
    };

    let response: ApiResponse<Project | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved projects",
      data: [],
    };

    let order: OrderItem = ["id", "ASC"];
    //TODO: change this into a function
    if (order_by) {
      if (order_by.toString().includes("ALPH")) order[0] = "name";
      else if (order_by.toString().includes("DATE")) order[0] = "createdAt";

      if (order_by && order_by.toString().includes("DESC")) order[1] = "DESC";
    }

    const getParameters = getJSONfromKeyArray(
      ["roleId", "stateId"],
      replaceJSONkeys(newKeys, req.query)
    );

    try {
      const projectsInTable = await Project.findAll({
        order: [order],
        limit: limit ? parseInt(limit.toString()) : QUERY_LIMIT,
        offset: offset ? parseInt(offset.toString()) : 0,
        where: getParameters,
      });
      checkIfNotFound(projectsInTable);
      response.data = projectsInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
};
