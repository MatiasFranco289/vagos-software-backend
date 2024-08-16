import { Request, Response } from "express";
import ProjectStatus from "../models/ProjectStatus";
import { ApiResponse } from "../interfaces";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
} from "../constants";

const PROJECT_STATUS_SUCCESSFUL_RETRIEVED =
  "Project status successfully retrieved.";

export const projectStatesController = {
  getAllStates: async (
    _req: Request,
    res: Response<ApiResponse<null | ProjectStatus>>
  ) => {
    let response: ApiResponse<null | ProjectStatus> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    try {
      const projectStates = await ProjectStatus.findAll();

      response.status_code = STATUS_CODE_OK;
      response.message = PROJECT_STATUS_SUCCESSFUL_RETRIEVED;
      response.data = projectStates;
    } catch (err) {
      console.error(
        "The following error has ocurred while trying to get all the project status:"
      );
      console.error(err);
    }

    return res.status(response.status_code).json(response);
  },
};
