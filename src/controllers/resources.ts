import { Request, Response } from "express";
import ResourceType from "../models/ResourceType";
import { ApiResponse } from "../interfaces";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
} from "../constants";
import Resource from "../models/Resource";
import { handleApiError } from "../utils";
import Project from "../models/Project";

interface ResourceCreationBodyRequest {
  url: string;
  type_id: number;
  project_id: number;
}

export const NO_PROJECT_FOUND_MESSAGE =
  "The project with the provided id cannot be found.";
export const NO_RESOURCE_TYPE_FOUND_MESSAGE =
  "The resource type with the provided id cannot be found.";
export const RESOURCE_SUCCESSFULLY_CREATED =
  "The resource has been successfully created.";
export const DEFAULT_ERROR_MESSAGE =
  "The following error has ocurred while trying to create a resource:";

export const resourcesController = {
  createResource: async (req: Request, res: Response) => {
    let project: Project | null;
    let createdResource: Resource | null;
    let resourceType: ResourceType | null;
    let response: ApiResponse<null> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    const { url, type_id, project_id }: ResourceCreationBodyRequest = req.body;

    try {
      resourceType = await ResourceType.findByPk(type_id);
    } catch (err) {
      console.error(
        `The following error has ocurred while trying to find the resource type with id ${type_id}:`
      );
      console.error(err);

      return res.status(response.status_code).json(response);
    }

    if (!resourceType) {
      response.status_code = STATUS_CODE_BAD_REQUEST;
      response.message = NO_RESOURCE_TYPE_FOUND_MESSAGE;

      return res.status(response.status_code).json(response);
    }

    try {
      project = await Project.findByPk(project_id);
    } catch (err) {
      console.error(
        `The following error ocurred while trying to find the project with the provided id (${project_id}):`
      );
      console.error(err);

      return res.status(response.status_code).json(response);
    }

    if (!project) {
      response.status_code = STATUS_CODE_BAD_REQUEST;
      response.message = NO_PROJECT_FOUND_MESSAGE;

      return res.status(response.status_code).json(response);
    }

    try {
      createdResource = await Resource.create({
        url: url,
        typeId: resourceType.id,
        projectId: project_id,
      });

      response.status_code = STATUS_CODE_CREATED;
      response.message = RESOURCE_SUCCESSFULLY_CREATED;
    } catch (err) {
      response = handleApiError(err, DEFAULT_ERROR_MESSAGE);
    }

    return res.status(response.status_code).json(response);
  },
};
