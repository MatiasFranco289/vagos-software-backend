import { Request, Response } from "express";

export const tagsController = {
  getAllTags: (req: Request, res: Response) => {
    res.status(200).json({
      status_code: 200,
      message: "finish this",
      data: [],
    });
  },
};
