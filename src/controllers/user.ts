import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import User from "../models/User";
import { STATUS_CODE } from "../constants";
import {
  checkIfNotFound,
  getArrayFromCSV,
  getJSONfromKeyArray,
  handleError,
  replaceJSONkeys,
} from "../utils";
import { OrderItem } from "sequelize";
import { QUERY_LIMIT } from "./../constants";

export const UserController = {
  createUser: async (req: Request, res: Response<ApiResponse<User | null>>) => {
    const { role_id } = req.body;
    const { state_id } = req.body;
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { profile_picture } = req.body;

    let response: ApiResponse<User | null> = {
      statusCode: STATUS_CODE.created,
      message: "User successfully created",
      data: [],
    };

    try {
      //this only allows for the creation of one user at a time
      const newUsers = await User.create({
        roleId: role_id,
        stateId: state_id,
        username: username,
        email: email,
        password: password, //TODO: encrypt this
        profilePicture: profile_picture,
      });
      response.data = [newUsers];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  updateUser: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    //Get the id of the user to update their data
    const { id } = req.params;

    //This is used to change the json key names to names that the User model can use
    //json uses snake_case, our models use camelCase, so if we want to find something
    //in the database we have to write the field names in camelCase
    let newKeys = {
      role_id: "roleId",
      state_id: "stateId",
      profile_pic: "profilePic",
      is_active: "isActive",
    };

    //Used to filter only the wanted elements from req.body.
    //In hindsight this should be done in the validations file
    const bodyElements = [
      "roleId",
      "stateId",
      "username",
      "email",
      "password",
      "profilePicture",
      "isActive",
    ];

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully updated 1 user", //Only 1 user can be updated at a time
      data: [],
    };

    //Make sure that the json is in camelCase and that it only has elements that exist
    //in the User model
    const updateParameters = getJSONfromKeyArray(
      bodyElements,
      replaceJSONkeys(newKeys, req.body)
    );

    try {
      const updatedUser = await User.update(updateParameters, {
        where: {
          id: id,
        },
      });
      checkIfNotFound(updatedUser[0]);
      response.data = [updatedUser[0]];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  /*
  deleteUser: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully deleted ",
      data: [],
    };

    try {
      const idToFind: Array<string> = getArrayFromCSV(id);
      const amountOfDeletedUsers = await User.destroy({
        where: {
          id: idToFind,
        },
      });
      checkIfNotFound(amountOfDeletedUsers);
      response.message +=
        amountOfDeletedUsers + " User" + (amountOfDeletedUsers != 1 ? "s" : "");
      response.data = [amountOfDeletedUsers];
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  */
  getUser: async (req: Request, res: Response<ApiResponse<User | null>>) => {
    const { id } = req.params;

    let response: ApiResponse<User | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved user",
      data: [],
    };

    try {
      const idToFind: Array<string> = getArrayFromCSV(id);
      const usersInTable = await User.findAll({
        where: {
          id: idToFind,
        },
      });
      checkIfNotFound(usersInTable);
      response.data = usersInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getAllUsers: async (
    req: Request,
    res: Response<ApiResponse<User | null>>
  ) => {
    const { order_by } = req.query;
    const { limit } = req.query;
    const { offset } = req.query;

    const newKeys = {
      role_id: "roleId",
      state_id: "stateId",
    };

    let response: ApiResponse<User | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully retrieved users",
      data: [],
    };

    let order: OrderItem = ["id", "ASC"];
    if (order_by) {
      if (order_by.toString().includes("ALPH")) order[0] = "username";
      else if (order_by.toString().includes("DATE")) order[0] = "createdAt";

      if (order_by && order_by.toString().includes("DESC")) order[1] = "DESC";
    }

    const getParameters = getJSONfromKeyArray(
      ["roleId", "stateId"],
      replaceJSONkeys(newKeys, req.query)
    );
    console.log(getParameters);

    try {
      const usersInTable = await User.findAll({
        order: [order],
        limit: limit ? parseInt(limit.toString()) : QUERY_LIMIT,
        offset: offset ? parseInt(offset.toString()) : 0,
        where: getParameters,
      });
      checkIfNotFound(usersInTable);
      response.data = usersInTable;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
};
