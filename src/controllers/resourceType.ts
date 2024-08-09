import { Request, Response } from "express";
import { ApiResponse } from "../interfaces";
import ResourceType from "../models/ResourceType";
import { STATUS_CODE } from "../constants";
import {
  checkIfNotFound,
  getArrayFromCSV,
  handleError,
  replaceJSONkeys,
} from "../utils";

export const ResourceTypeController = {
  createResourceType: async (
    req: Request,
    res: Response<ApiResponse<ResourceType | null>>
  ) => {
    const { resource_type_name } = req.body;

    let response: ApiResponse<ResourceType | null> = {
      statusCode: STATUS_CODE.created,
      message: "Resource type successfully created",
      data: [],
    };

    try {
      let resourceTypes: string[];

      if (Array.isArray(resource_type_name)) resourceTypes = resource_type_name;
      else resourceTypes = [resource_type_name];

      const newResourceType = await ResourceType.bulkCreate(
        resourceTypes.map((name) => ({ name: name }))
      );
      response.data = newResourceType;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  updateResourceType: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    const newKeys = {
      is_active: "isActive",
      new_resource_type_name: "name",
    };

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Resource type successfully updated",
      data: [],
    };

    const updateParameters = replaceJSONkeys(newKeys, req.body);

    try {
      const updatedResourceType = await ResourceType.update(updateParameters, {
        where: {
          id: id,
        },
      });
      checkIfNotFound(updatedResourceType[0]);
      response.data = [updatedResourceType[0]];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getResourceType: async (
    req: Request,
    res: Response<ApiResponse<ResourceType | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<ResourceType | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved resource type",
      data: [],
    };

    try {
      const idToFind: Array<string> = getArrayFromCSV(id);
      const resourceTypesInTable = await ResourceType.findAll({
        where: { id: idToFind },
      });
      checkIfNotFound(resourceTypesInTable);
      response.data = resourceTypesInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getAllResourceType: async (
    req: Request,
    res: Response<ApiResponse<ResourceType | null>>
  ) => {
    let response: ApiResponse<ResourceType | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved resource types",
      data: [],
    };

    try {
      const resourceTypesInTable = await ResourceType.findAll();
      checkIfNotFound(resourceTypesInTable);
      response.data = resourceTypesInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
};
