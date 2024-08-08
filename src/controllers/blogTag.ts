import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import ProjectTag from "../models/ProjectTag";
import {
  checkIfNotFound,
  getArrayFromCSV,
  getErrorMessages,
  handleError,
} from "../utils";
import { STATUS_CODE } from "../constants";
import BlogTag from "../models/BlogTag";

export const BlogTagController = {
  createBlogTag: async (
    req: Request,
    res: Response<ApiResponse<BlogTag | null>>
  ) => {
    const { blog_tag_name } = req.body;

    let response: ApiResponse<BlogTag | null> = {
      statusCode: STATUS_CODE.created,
      message: "Blog Tags Successfully Created",
      data: [],
    };

    let tags: Array<string> = [];
    if (Array.isArray(blog_tag_name)) tags = blog_tag_name;
    else tags = [blog_tag_name];

    try {
      const newTags = await BlogTag.bulkCreate(
        tags.map((tagName) => ({ name: tagName }))
      );
      response.data = newTags;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  updateBlogTag: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;
    const { new_blog_tag_name } = req.body;

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.created,
      message: "Successfully Updated ",
      data: [],
    };

    try {
      const amountOfUpdatedTags: number[] = await BlogTag.update(
        { name: new_blog_tag_name },
        {
          where: {
            id: id,
          },
        }
      );
      checkIfNotFound(amountOfUpdatedTags);
      response.message +=
        amountOfUpdatedTags[0] +
        " Blog Tag" +
        (amountOfUpdatedTags[0] != 1 ? "s" : "");
      response.data = [amountOfUpdatedTags[0]];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  deleteBlogTag: async (
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
      const amountOfDeletedTags: number = await BlogTag.destroy({
        where: {
          id: idToFind,
        },
      });
      checkIfNotFound(amountOfDeletedTags);
      response.message +=
        amountOfDeletedTags +
        " Project Tag" +
        (amountOfDeletedTags != 1 ? "s" : "");
      response.data = [amountOfDeletedTags];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getBlogTag: async (
    req: Request,
    res: Response<ApiResponse<BlogTag | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<BlogTag | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved Blog Tags",
      data: [],
    };

    const idToFind: Array<string> = getArrayFromCSV(id);

    try {
      const blogTagsInTable: BlogTag[] = await BlogTag.findAll({
        where: {
          id: idToFind,
        },
      });
      checkIfNotFound(blogTagsInTable);
      response.data = blogTagsInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getAllBlogTags: async (
    req: Request,
    res: Response<ApiResponse<BlogTag | null>>
  ) => {
    let response: ApiResponse<BlogTag> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved All Blog Tags",
      data: [],
    };

    try {
      const blogTagsInTable = await BlogTag.findAll();
      checkIfNotFound(blogTagsInTable);
      response.data = blogTagsInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
};
