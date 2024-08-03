import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import ProjectTag from "../models/ProjectTag";
import { getArrayFromCSV } from "../utils";
import { STATUS_CODE } from "../constants";

export const ProjectTagController = {
  createProjectTag: async (
    req: Request,
    res: Response<ApiResponse<ProjectTag | null>>
  ) => {
    const { project_tag_name } = req.body;

    const response: ApiResponse<ProjectTag | null> = {
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
      //Iterate over the errors and show them in the response
      let message: string = "";
      err.errors.forEach((element) => {
        message += element.message + ": " + element.value;
      });

      response.message = message;
      response.statusCode = STATUS_CODE.conflict;
    }

    res.status(response.statusCode).json(response);
  },
  updateProjectTag: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;
    const { new_project_tag_name } = req.body;

    const response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.created,
      message: "Successfully Updated ",
      data: [],
    };

    let updatedProjectTags;
    try {
      updatedProjectTags = await ProjectTag.update(
        { name: new_project_tag_name },
        {
          where: {
            id: id,
          },
        }
      );
      response.message +=
        updatedProjectTags[0] +
        " Project Tag" +
        (updatedProjectTags[0] > 1 ? "s" : "");
      response.data = [updatedProjectTags[0]];
    } catch (err) {
      console.log(err);
      response.statusCode = STATUS_CODE.conflict;
      response.message =
        "The specified role name already exists, the new role name must be unique";
    }

    res.status(response.statusCode).json(response);
  },
  deleteProjectTags: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    const response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Deleted ",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);

    const deletedRoles = await ProjectTag.destroy({
      where: {
        id: idToFind,
      },
    });

    response.message +=
      deletedRoles + " Project Tag" + (deletedRoles != 1 ? "s" : "");
    response.data = [deletedRoles];

    res.status(response.statusCode).json(response);
  },
  getProjectTag: async (
    req: Request,
    res: Response<ApiResponse<ProjectTag | null>>
  ) => {
    const { id } = req.params;

    const response: ApiResponse<ProjectTag | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved Roles",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);

    const roles = await ProjectTag.findAll({
      where: {
        id: idToFind,
      },
    });

    response.data = roles;

    res.status(response.statusCode).json(response);
  },
  getAllProjectTags: async (
    req: Request,
    res: Response<ApiResponse<ProjectTag>>
  ) => {
    const response: ApiResponse<ProjectTag> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved All Project Tags",
      data: [],
    };

    const roles = await ProjectTag.findAll();

    response.data = roles;

    res.status(response.statusCode).json(response);
  },
};
