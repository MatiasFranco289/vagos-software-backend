import { Response, Request, NextFunction } from "express";
import { ApiResponse } from "../interfaces";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
} from "../constants";
import Project from "../models/Project";
import User from "../models/User";
import Blog from "../models/Blog";
import { handleApiError } from "../utils";

export const PROJECT_NOT_FOUND_MESSAGE =
  "The provided project id does not correspond to any existent project.";
export const USER_NOT_FOUND_MESSAGE =
  "The provided user id does not correspond to any existent user.";
export const DEFAULT_ERROR_MESSAGE =
  "The following error has ocurred while trying to create the blog: ";
export const SUCCESSFUL_BLOG_CREATION_MESSAGE =
  "The blog has been successfully created.";

export const blogsController = {
  createBlog: async (req: Request, res: Response<ApiResponse<null>>) => {
    let response: ApiResponse<null> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    const { title, description, project_id, user_id } = req.body;
    let project: Project;
    let user: User;

    // Check if the project exist
    try {
      project = await Project.findByPk(project_id);

      if (!project) {
        response.status_code = STATUS_CODE_BAD_REQUEST;
        response.message = PROJECT_NOT_FOUND_MESSAGE;

        return res.status(response.status_code).json(response);
      }
    } catch (err) {
      console.error(
        `The following error has ocurred while trying to recover the project with id ${project_id}: `
      );
      console.error(err);

      return res.status(response.status_code).json(response);
    }

    // Check if the user exist

    try {
      user = await User.findByPk(user_id);

      if (!user) {
        response.status_code = STATUS_CODE_BAD_REQUEST;
        response.message = USER_NOT_FOUND_MESSAGE;

        return res.status(response.status_code).json(response);
      }
    } catch (err) {
      console.error(
        `The following error has ocurred while trying to recover the user with id ${user_id}: `
      );
      console.error(err);

      return res.status(response.status_code).json(response);
    }

    // If i everything looks correct i try to create the blog

    try {
      await Blog.create({
        title: title,
        description: description,
        userId: user.id,
        projectId: project.id,
      });

      response.status_code = STATUS_CODE_CREATED;
      response.message = SUCCESSFUL_BLOG_CREATION_MESSAGE;

      return res.status(response.status_code).json(response);
    } catch (err) {
      response = handleApiError(err, DEFAULT_ERROR_MESSAGE);
      return res.status(response.status_code).json(response);
    }
  },
};
