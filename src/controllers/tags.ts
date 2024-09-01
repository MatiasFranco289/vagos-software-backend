import { Request, response, Response } from "express";
import Tag from "../models/Tag";
import { ApiResponse } from "../interfaces";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
} from "../constants";

export const TAGS_RETRIEVED_SUCCESSFUL_MESSAGE = "Tags retrieved successfully.";

export const tagsController = {
  getAllTags: async (req: Request, res: Response<ApiResponse<null | Tag>>) => {
    let response: ApiResponse<null | Tag> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    try {
      const tags = await Tag.findAll();
      response.status_code = STATUS_CODE_OK;
      response.message = TAGS_RETRIEVED_SUCCESSFUL_MESSAGE;
      response.data = tags;
    } catch (err) {
      console.error(
        "The following error has ocurred while trying to get all Tags:"
      );
      console.error(err);
    }

    return res.status(response.status_code).json(response);
  },
};
