import { Request, Response } from "express";
import { ApiResponse } from "../interfaces";
import Resource from "../models/Resource";
import { QUERY_LIMIT, STATUS_CODE } from "../constants";
import {
  checkIfNotFound,
  getArrayFromCSV,
  getJSONfromKeyArray,
  handleError,
  replaceJSONkeys,
} from "../utils";
import { OrderItem } from "sequelize";

export const ResourceController = {
  createResource: async (
    req: Request,
    res: Response<ApiResponse<Resource | null>>
  ) => {
    const { resource_type_id } = req.body;
    const { resource_url } = req.body;

    let response: ApiResponse<Resource | null> = {
      statusCode: STATUS_CODE.created,
      message: "Resource successfully created",
      data: [],
    };

    try {
      const newResource = await Resource.create({
        resourceTypeId: resource_type_id,
        url: resource_url,
      });
      response.data = [newResource];
    } catch (err) {
      response = handleError(err);
    }
    res.status(response.statusCode).json(response);
  },
  updateResource: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    const newKeys = {
      new_resource_type_id: "resourceTypeId",
      new_resource_url: "url",
    };

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully updated resource",
      data: [],
    };

    const updateParameters = replaceJSONkeys(newKeys, req.body);
    console.log(updateParameters);

    try {
      const updatedResources = await Resource.update(updateParameters, {
        where: {
          id: id,
        },
      });
      checkIfNotFound(updatedResources[0]);
      response.data = [updatedResources[0]];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  deleteResource: async (
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
      const amountOfDeletedResources: number = await Resource.destroy({
        where: {
          id: idToFind,
        },
      });
      checkIfNotFound(amountOfDeletedResources);
      response.message +=
        amountOfDeletedResources +
        " Resource" +
        (amountOfDeletedResources != 1 ? "s" : "");
      response.data = [amountOfDeletedResources];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getResource: async (
    req: Request,
    res: Response<ApiResponse<Resource | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<Resource | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved resource",
      data: [],
    };

    try {
      const idToFind: Array<string> = getArrayFromCSV(id);
      const resourcesInTable = await Resource.findAll({
        where: { id: idToFind },
      });
      checkIfNotFound(resourcesInTable);
      response.data = resourcesInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getAllResource: async (
    req: Request,
    res: Response<ApiResponse<Resource | null>>
  ) => {
    const { order_by } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    const newKeys = {
      resource_type_id: "resourceTypeId",
    };

    let response: ApiResponse<Resource | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved resource",
      data: [],
    };

    let order: OrderItem = ["id", "ASC"];
    if (order_by) {
      if (order_by.toString().includes("ALPH")) order[0] = "url";
      else if (order_by.toString().includes("DATE")) order[0] = "createdAt";

      if (order_by && order_by.toString().includes("DESC")) order[1] = "DESC";
    }

    const getParameters = getJSONfromKeyArray(
      ["resourceTypeId"],
      replaceJSONkeys(newKeys, req.query)
    );

    try {
      const resourcesInTable = await Resource.findAll({
        order: [order],
        limit: limit ? parseInt(limit.toString()) : QUERY_LIMIT,
        offset: offset ? parseInt(offset.toString()) : 0,
        where: getParameters,
      });
      checkIfNotFound(resourcesInTable);
      response.data = resourcesInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
};
