import { Request, Response } from "express";
import User from "../models/User";
import { ApiResponse } from "../interfaces";
import { STATUS_CODE_BAD_REQUEST } from "../constants";

export const CREATOR_NOT_FOUND_MESSAGE =
  "No user was found with the provided id";

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
  resources_id?: Array<number>;
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
      resources_id,
      creator_id,
    }: ProjectCreationBodyRequest = req.body;

    let response: ApiResponse<null> = {
      status_code: STATUS_CODE_BAD_REQUEST,
      message: CREATOR_NOT_FOUND_MESSAGE,
      data: [],
    };
    // TODO: Iterar sobre el array de tags_id verificando si las ids provistas corresponden o no a un tag real, si no retornar un error
    // TODO: Si resources_id es provisto iterar sobre el array y verificar si el recurso existe o no, si alguno no existe devolver error
    // TODO: Verificar si el status_id corresponde a un estado valido, sino devolver error
    // TODO: Verificar si el creator_id corresponde a un usuario valido, sino devolver error

    const creator: User = await User.findByPk(creator_id);

    if (!creator) {
      return res.status(response.status_code).json(response);
    }

    return res.status(200).json({
      status_code: 200,
      message: "Hola",
      data: [],
    });
  },
};
