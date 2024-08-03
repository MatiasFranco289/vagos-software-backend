import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import Project from "../models/Project";
import { STATUS_CODE } from "../constants";
import { getArrayFromCSV } from "../utils";

export const ProjectController = {
  getProject: async (
    req: Request,
    res: Response<ApiResponse<Project | null>>
  ) => {
    const { id } = req.params;

    const response: ApiResponse<Project | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved Roles",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);

    const projects = await Project.findAll({
      where: {
        id: idToFind,
      },
    });

    //TODO: ERROR 404

    response.data = projects;

    res.status(response.statusCode).json(response);
  },
};
