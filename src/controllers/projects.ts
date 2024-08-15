import { Request, Response } from "express";
import User from "../models/User";
import { ApiResponse } from "../interfaces";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
} from "../constants";
import Tag from "../models/Tag";
import { Op } from "sequelize";
import Resource from "../models/Resource";
import Project from "../models/Project";
import ProjectStatus from "../models/ProjectStatus";
import Board from "../models/Board";

export const CREATOR_NOT_FOUND_MESSAGE =
  "No user was found with the provided id.";
export const STATUS_ID_NOT_FOUND_MESSAGE =
  "No status was found with the provided id.";
export const TAG_NOT_FOUND_MESSAGE =
  "Some of the ids delivered do not correspond to an existing tag.";
export const RESOURCE_NOT_FOUND_MESSAGE =
  "Some of the ids delivered do not correspond to an existing tag.";
export const SUCCESS_PROJECT_CREATION_MESSAGE =
  "The project has been successfully created.";
// Expected attributes in body object for project creation
type ProjectCreationBodyRequest = {
  title: string;
  description: string;
  thumbnail_url: string;
  start_date: string;
  end_date?: string;
  expected_end_date?: string;
  status_id: number;
  repository_url: string;
  tags_id: Array<number>;
  creator_id: number;
};

export const projectsController = {
  createProject: async (req: Request, res: Response) => {
    const {
      title,
      description,
      thumbnail_url,
      start_date,
      end_date,
      expected_end_date,
      status_id,
      repository_url,
      tags_id,
      creator_id,
    }: ProjectCreationBodyRequest = req.body;
    let response: ApiResponse<null> = {
      status_code: STATUS_CODE_BAD_REQUEST,
      message: CREATOR_NOT_FOUND_MESSAGE,
      data: [],
    };
    // Validations
    const creator: User = await User.findByPk(creator_id);

    if (!creator) {
      return res.status(response.status_code).json(response);
    }

    const status: ProjectStatus = await ProjectStatus.findByPk(status_id);

    if (!status) {
      response.message = STATUS_ID_NOT_FOUND_MESSAGE;
      return res.status(response.status_code).json(response);
    }

    const tags: Array<Tag> = await Tag.findAll({
      where: {
        id: {
          [Op.in]: tags_id,
        },
      },
    });

    if (tags.length !== tags_id.length) {
      response.message = TAG_NOT_FOUND_MESSAGE;
      return res.status(response.status_code).json(response);
    }

    try {
      const createdProject = await Project.create({
        title: title,
        description: description,
        thumbnailUrl: thumbnail_url,
        repositoryUrl: repository_url,
        statusId: status.id,
        startDate: start_date,
        endDate: end_date,
        expectedEndDate: expected_end_date,
        creatorId: creator.id,
      });

      createdProject.addTags(tags);
      Board.create({
        title: `${title} board`,
        projectId: createdProject.id,
      });

      response.status_code = STATUS_CODE_CREATED;
      response.message = SUCCESS_PROJECT_CREATION_MESSAGE;
    } catch (err) {
      console.error(
        "The following error has ocurred while trying to create a project."
      );
      console.error(err);

      response.status_code = STATUS_CODE_INTERNAL_SERVER_ERROR;
      response.message = INTERNAL_SERVER_ERROR_MESSAGE;
    }

    return res.status(response.status_code).json(response);
  },
};
