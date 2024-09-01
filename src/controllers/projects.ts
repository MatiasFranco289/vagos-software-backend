import { Request, Response } from "express";
import User from "../models/User";
import { ApiResponse } from "../interfaces";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_OK,
} from "../constants";
import Tag from "../models/Tag";
import { fn, literal, Op, QueryTypes, Sequelize } from "sequelize";
import Project from "../models/Project";
import ProjectStatus from "../models/ProjectStatus";
import Board from "../models/Board";
import { handleApiError } from "../utils";
import Blog from "../models/Blog";
import Resource from "../models/Resource";
import Role from "../models/Role";
import UserStatus from "../models/UserStatus";
import ResourceType from "../models/ResourceType";

export const PROJECTS_ORDER_BY_TYPES = [
  "id",
  "title",
  "status_id",
  "start_date",
  "end_date",
  "expected_end_date",
  "creator_id",
];
export const DEFAULT_PROJECTS_ORDER_BY = "title";
export const DEFAULT_PROJECTS_ORDER = "ASC";
export const DEFAULT_PROJECTS_LIMIT = "20";
export const DEFAULT_PROJECTS_OFFSET = "0";

export const SUCCESS_PROJECTS_RETRIVED_MESSAGE =
  "Projects retrieved successfully.";
export const SUCCESS_PROJECT_RETRIEVED_MESSAGE =
  "Project retrieved successfully.";
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
const DEFAULT_CREATION_ERROR_MESSAGE =
  "The following error has ocurred while trying to create a project: ";
const DEFAULT_RETRIEVE_ERROR_MESSAGE =
  "The following error has ocurred while trying to recover the project: ";

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
  createProject: async (req: Request, res: Response<ApiResponse<null>>) => {
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
      response = handleApiError(err, DEFAULT_CREATION_ERROR_MESSAGE);
    }

    return res.status(response.status_code).json(response);
  },

  getAllProjects: async (
    req: Request,
    res: Response<ApiResponse<{ projects: Array<Project>; total: number }>>
  ) => {
    let response: ApiResponse<{
      projects: Array<Project>;
      total: number;
    } | null> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    const order_by =
      (req.query.order_by as string) || DEFAULT_PROJECTS_ORDER_BY;
    const order = (req.query.order as string) || DEFAULT_PROJECTS_ORDER;
    const limit = parseInt(
      (req.query.limit as string) || DEFAULT_PROJECTS_LIMIT
    );
    const offset = parseInt(
      (req.query.offset as string) || DEFAULT_PROJECTS_OFFSET
    );
    const search = req.query.search;
    let tags: string | string[] = req.query.tags as string;
    tags = tags ? tags.split(",") : [];

    try {
      let projectFilteredByTagsIds: Array<number>;

      // If the client is trying to filter by tags
      // I get all the projects ids with tags matching the required
      if (tags.length) {
        projectFilteredByTagsIds = (
          await Project.findAll({
            include: [
              {
                model: Tag,
                as: "tags",
                attributes: [],
                where: {
                  name: {
                    [Op.in]: tags,
                  },
                },
                through: {
                  attributes: [],
                },
              },
            ],
            attributes: ["id"],
            group: ["Project.id"],
            having: literal(`COUNT(DISTINCT "tags"."name") = ${tags.length}`),
          })
        ).map((project) => {
          return project.id;
        });
      }

      // If there are tags, i add the filter clause, filtering for the ids retrieved by the query above
      let projectsWhereClause: any = tags.length
        ? {
            id: {
              [Op.in]: projectFilteredByTagsIds,
            },
          }
        : null;

      // if the client is trying to search i add filter by project title
      if (search) {
        projectsWhereClause = {
          ...projectsWhereClause,
          title: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      // i find all the projects with the ids retrieved by the query above
      // but i include all the needed data, sorting, limit and offset
      const projects = await Project.findAll({
        where: projectsWhereClause,
        include: [
          {
            model: Tag,
            as: "tags",
            through: { attributes: [] },
          },
          {
            model: ProjectStatus,
            as: "status",
          },
        ],
        order: [[order_by, order]],
        limit: limit,
        offset: offset,
      });

      // finally i get the total amount of projects fullfilling all conditions
      const totalProjects = await Project.count({
        where: projectsWhereClause,
      });

      response.status_code = STATUS_CODE_OK;
      response.message = SUCCESS_PROJECTS_RETRIVED_MESSAGE;
      response.data = [
        {
          projects: projects,
          total: totalProjects,
        },
      ];
    } catch (err) {
      console.log(err);
    }

    return res.status(response.status_code).json(response);
  },
  getProjectById: async (
    req: Request,
    res: Response<ApiResponse<null | Project>>
  ) => {
    let response: ApiResponse<null | Project> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    const { id } = req.params;

    try {
      const project = await Project.findByPk(id, {
        include: [
          {
            model: Tag,
            as: "tags",
            through: { attributes: [] },
          },
          {
            model: ProjectStatus,
            as: "status",
          },
          {
            model: Blog,
            as: "blogs",
            include: [
              {
                model: User,
                as: "user",
                attributes: { exclude: ["password"] },
              },
            ],
          },
          {
            model: Resource,
            as: "resources",
            include: [{ model: ResourceType, as: "type" }],
          },
          {
            model: User,
            as: "creator",
            attributes: { exclude: ["password"] },
            include: [
              { model: Role, as: "role" },
              { model: UserStatus, as: "status" },
            ],
          },
          {
            model: Board,
            as: "board",
          },
        ],
      });

      response.status_code = STATUS_CODE_OK;
      response.message = SUCCESS_PROJECT_RETRIEVED_MESSAGE;
      response.data = project ? [project] : [];
    } catch (err) {
      console.error(DEFAULT_RETRIEVE_ERROR_MESSAGE);
      console.error(err);
    }

    return res.status(response.status_code).json(response);
  },
};
