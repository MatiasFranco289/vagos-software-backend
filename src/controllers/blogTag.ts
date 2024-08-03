import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import ProjectTag from "../models/ProjectTag";
import { getArrayFromCSV, getErrorMessages } from "../utils";
import { STATUS_CODE } from "../constants";
import BlogTag from "../models/BlogTag";

export const BlogTagController = {
  createBlogTag: async (
    req: Request,
    res: Response<ApiResponse<BlogTag | null>>
  ) => {
    const { blog_tag_name } = req.body;

    const response: ApiResponse<BlogTag | null> = {
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
      //Iterate over the errors and show them in the response
      response.message = getErrorMessages(err);
      response.statusCode = STATUS_CODE.conflict;
    }

    res.status(response.statusCode).json(response);
  },
  updateBlogTag: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;
    const { new_blog_tag_name } = req.body;

    const response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.created,
      message: "Successfully Updated ",
      data: [],
    };

    let numberOfUpdatedTags;
    try {
      numberOfUpdatedTags = await BlogTag.update(
        { name: new_blog_tag_name },
        {
          where: {
            id: id,
          },
        }
      );
      response.message +=
        numberOfUpdatedTags[0] +
        " Blog Tag" +
        (numberOfUpdatedTags[0] != 1 ? "s" : "");
      response.data = [numberOfUpdatedTags[0]];
    } catch (err) {
      response.message = getErrorMessages(err);
      response.statusCode = STATUS_CODE.conflict;
    }

    res.status(response.statusCode).json(response);
  },
  deleteBlogTag: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    const response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Deleted ",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);

    let numberOfDeletedTags: number;

    try {
      numberOfDeletedTags = await BlogTag.destroy({
        where: {
          id: idToFind,
        },
      });
    } catch (err) {
      response.message = getErrorMessages(err);
      response.statusCode = STATUS_CODE.conflict;
    }

    response.message +=
      numberOfDeletedTags +
      " Project Tag" +
      (numberOfDeletedTags != 1 ? "s" : "");
    response.data = [numberOfDeletedTags];

    res.status(response.statusCode).json(response);
  },
  getBlogTag: async (
    req: Request,
    res: Response<ApiResponse<BlogTag | null>>
  ) => {
    const { id } = req.params;

    const response: ApiResponse<BlogTag | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved Blog Tags",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);
    let blogTagsInTable: BlogTag[];

    try {
      blogTagsInTable = await BlogTag.findAll({
        where: {
          id: idToFind,
        },
      });
    } catch (err) {
      response.message = getErrorMessages(err);
      response.statusCode = STATUS_CODE.conflict;
    }

    response.data = blogTagsInTable;

    res.status(response.statusCode).json(response);
  },
  getAllBlogTags: async (
    req: Request,
    res: Response<ApiResponse<BlogTag | null>>
  ) => {
    const response: ApiResponse<BlogTag> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved All Blog Tags",
      data: [],
    };

    const blogTagsInTable = await BlogTag.findAll();

    response.data = blogTagsInTable;

    res.status(response.statusCode).json(response);
  },
};
