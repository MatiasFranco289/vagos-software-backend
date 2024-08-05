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
    const { project_tag_name } = req.body;

    let response: ApiResponse<ProjectTag | null> = {
      statusCode: STATUS_CODE.created,
      message: "Project Tags Successfully Created",
      data: [],
    };

    let tags: Array<string> = [];
    if (Array.isArray(project_tag_name)) tags = project_tag_name;
    else tags = [project_tag_name];

    try {
      const newTags = await ProjectTag.bulkCreate(
        tags.map((tagName) => ({ name: tagName }))
      );
      response.data = newTags;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  updateProjectTag: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;
    const { new_project_tag_name } = req.body;

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.created,
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

    res.status(response.statusCode).json(response);
  },
  deleteProjectTags: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
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

    res.status(response.statusCode).json(response);
  },
  getProjectTag: async (
    req: Request,
    res: Response<ApiResponse<ProjectTag | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<ProjectTag | null> = {
      statusCode: STATUS_CODE.ok,
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

    res.status(response.statusCode).json(response);
  },
  getAllProjectTags: async (
    req: Request,
    res: Response<ApiResponse<ProjectTag>>
  ) => {
    let response: ApiResponse<ProjectTag> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved All Project Tags",
      data: [],
    };

    try {
      const tags = await ProjectTag.findAll();
      checkIfNotFound(tags);
      response.data = tags;
    } catch (err) {
      response = handleError(err);
    }
    res.status(response.statusCode).json(response);
  },
};
