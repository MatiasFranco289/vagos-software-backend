import { Request, Response } from "express";
import { ApiResponse } from "../interfaces";
import Blog from "../models/Blog";
import { QUERY_LIMIT, STATUS_CODE } from "../constants";
import {
  checkIfNotFound,
  getArrayFromCSV,
  getJSONfromKeyArray,
  handleError,
  replaceJSONkeys,
} from "../utils";
import { OrderItem } from "sequelize";

export const BlogController = {
  createBlog: async (req: Request, res: Response<ApiResponse<Blog | null>>) => {
    const { project_id } = req.body;
    const { creator_id } = req.body;
    const { blog_title } = req.body;
    const { blog_content } = req.body;

    let response: ApiResponse<Blog | null> = {
      status_code: STATUS_CODE.created,
      message: "Blog successfully created",
      data: [],
    };

    try {
      const newBlog = await Blog.create({
        projectId: project_id,
        creatorId: creator_id,
        title: blog_title,
        content: blog_content,
      });
      response.data = [newBlog];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  updateBlog: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    const newKeys = {
      project_id: "projectId",
      creator_id: "creatorId",
      blog_title: "title",
      blog_content: "content",
      is_active: "isActive",
    };

    let response: ApiResponse<number | null> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully updated blog",
      data: [],
    };

    const updateParameters = replaceJSONkeys(newKeys, req.body);

    try {
      const updatedBlogs = await Blog.update(updateParameters, {
        where: {
          id: id,
        },
      });
      checkIfNotFound(updatedBlogs[0]);
      response.data = [updatedBlogs[0]];
    } catch (err) {
      response = handleError(response);
    }

    res.status(response.status_code).json(response);
  },
  getBlog: async (req: Request, res: Response<ApiResponse<Blog | null>>) => {
    const { id } = req.params;

    let response: ApiResponse<Blog | null> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully retrieved Blog",
      data: [],
    };

    try {
      const idToFind: Array<string> = getArrayFromCSV(id);
      const blogsInTable = await Blog.findAll({
        where: { id: idToFind },
      });
      checkIfNotFound(blogsInTable);
      response.data = blogsInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  getAllBlogs: async (
    req: Request,
    res: Response<ApiResponse<Blog | null>>
  ) => {
    const { order_by } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    const newKeys = {
      project_id: "projectId",
      creator_id: "creatorId",
    };

    let response: ApiResponse<Blog | null> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully retrieved blogs",
      data: [],
    };

    let order: OrderItem = ["id", "ASC"];
    if (order_by) {
      if (order_by.toString().includes("ALPH")) order[0] = "title";
      else if (order_by.toString().includes("DATE")) order[0] = "createdAt";

      if (order_by && order_by.toString().includes("DESC")) order[1] = "DESC";
    }

    const getParameters = getJSONfromKeyArray(
      ["projectId", "stateId"],
      replaceJSONkeys(newKeys, req.query)
    );
    console.log(getParameters);

    try {
      const blogsInTable = await Blog.findAll({
        order: [order],
        limit: limit ? parseInt(limit.toString()) : QUERY_LIMIT,
        offset: offset ? parseInt(offset.toString()) : 0,
        where: getParameters,
      });
      checkIfNotFound(blogsInTable);
      response.data = blogsInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
};
