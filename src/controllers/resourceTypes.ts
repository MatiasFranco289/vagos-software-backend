import { Request, Response } from "express";
import ResourceType from "../models/ResourceType";
import { ApiResponse } from "../interfaces";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  STATUS_CODE_CREATED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_OK,
} from "../constants";
import { handleApiError } from "../utils";

export const RESOURCE_TYPES_SUCCESSFULLY_RETRIEVED_MESSAGE =
  "Resource types successfully retrieved.";
export const RESOURCE_TYPE_SUCCESSFULLY_CREATED_MESSAGE =
  "The resource type was successfully created.";
export const DEFAULT_ERROR_MESSAGE =
  "The following error has ocurred while trying to create the resource type: ";
export const RESOURCE_TYPE_SUCCESSFULLY_UPDATED =
  "The resource type was successfully updated.";
export const RESOURCE_TYPE_NOT_FOUND_MESSAGE =
  "The resource type was not found.";

export const resourceTypesController = {
  getAllResourceTypes: async (
    _req: Request,
    res: Response<ApiResponse<ResourceType | null>>
  ) => {
    let response: ApiResponse<ResourceType | null> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    try {
      const resources = await ResourceType.findAll();
      response = {
        status_code: STATUS_CODE_OK,
        message: RESOURCE_TYPES_SUCCESSFULLY_RETRIEVED_MESSAGE,
        data: resources,
      };
    } catch (err) {
      console.error(
        `The following error has ocurred while trying to get all resource types: `
      );
      console.error(err);
    }

    return res.status(response.status_code).json(response);
  },
  createResourceType: async (req: Request, res: Response) => {
    const { name } = req.body;
    let response: ApiResponse<ResourceType | null> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    try {
      const createdResource = await ResourceType.create({
        name: name,
      });

      response = {
        status_code: STATUS_CODE_CREATED,
        message: RESOURCE_TYPE_SUCCESSFULLY_CREATED_MESSAGE,
        data: [createdResource],
      };
    } catch (err) {
      response = handleApiError(err, DEFAULT_ERROR_MESSAGE);
    }

    return res.status(response.status_code).json(response);
  },
  updateResourceType: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    let response: ApiResponse<null> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    try {
      const [updatedCount] = await ResourceType.update(
        { name: name },
        { where: { id } }
      );

      if (updatedCount) {
        response.status_code = STATUS_CODE_OK;
        response.message = RESOURCE_TYPE_SUCCESSFULLY_UPDATED;
      } else {
        response.status_code = STATUS_CODE_NOT_FOUND;
        response.message = RESOURCE_TYPE_NOT_FOUND_MESSAGE;
      }
    } catch (err) {
      response = handleApiError(err, DEFAULT_ERROR_MESSAGE);
    }

    return res.status(response.status_code).json(response);
  },
};
