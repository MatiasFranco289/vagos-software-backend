import { ApiResponse } from "../interfaces";
import { Request, response, Response } from "express";
import ProjectTag from "../models/ProjectTag";
import { checkIfNotFound, getArrayFromCSV, handleError } from "../utils";
import { STATUS_CODE } from "../constants";

export const ProjectTagController = {
  createProjectTag: async (
    req: Request,
    res: Response<ApiResponse<ProjectTag | null>>
  ) => {
    const { name } = req.body;

    let response: ApiResponse<ProjectTag | null> = {
      status_code: STATUS_CODE.created,
      message: "Project tag successfully created",
      data: [],
    };

    try {
      const newTag = await ProjectTag.create({
        name: name,
      });

      response.data = [newTag];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  updateProjectTag: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;
    const { new_project_tag_name } = req.body;

    let response: ApiResponse<number | null> = {
      status_code: STATUS_CODE.created,
      message: "Successfully Updated ",
      data: [],
    };

    try {
      const updatedProjectTags = await ProjectTag.update(
        { name: new_project_tag_name },
        {
          where: {
            id: id,
          },
        }
      );
      checkIfNotFound(updatedProjectTags);
      response.message +=
        updatedProjectTags[0] +
        " Project Tag" +
        (updatedProjectTags[0] > 1 ? "s" : "");
      response.data = [updatedProjectTags[0]];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  deleteProjectTags: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<number | null> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully Deleted ",
      data: [],
    };

    const idToFind: Array<string> = getArrayFromCSV(id);

    try {
      const amountOfDeleteTags = await ProjectTag.destroy({
        where: {
          id: idToFind,
        },
      });
      checkIfNotFound(amountOfDeleteTags);
      response.message +=
        amountOfDeleteTags +
        " Project Tag" +
        (amountOfDeleteTags != 1 ? "s" : "");
      response.data = [amountOfDeleteTags];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  getProjectTag: async (
    req: Request,
    res: Response<ApiResponse<ProjectTag | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<ProjectTag | null> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully Retrieved Tags",
      data: [],
    };

    try {
      let idToFind: Array<string> = getArrayFromCSV(id);

      const tags = await ProjectTag.findAll({
        where: {
          id: idToFind,
        },
      });

      checkIfNotFound(tags);

      response.data = tags;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  getAllProjectTags: async (
    _req: Request,
    res: Response<ApiResponse<ProjectTag>>
  ) => {
    let response: ApiResponse<ProjectTag> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully retrieved all project tags",
      data: [],
    };

    try {
      const tags = await ProjectTag.findAll();
      response.data = tags;
    } catch (err) {
      response = handleError(err);
    }
    res.status(response.status_code).json(response);
  },
};
