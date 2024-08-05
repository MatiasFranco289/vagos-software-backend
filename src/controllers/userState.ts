import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import { STATUS_CODE } from "../constants";
import { getErrorMessages, getArrayFromCSV } from "../utils";
import UserState from "../models/UserState";

export const UserStateController = {
  createUserState: async (
    req: Request,
    res: Response<ApiResponse<UserState | null>>
  ) => {
    const { user_state_name } = req.body;

    let newUserState: UserState[] | null = null;

    const response: ApiResponse<UserState> = {
      statusCode: STATUS_CODE.created,
      message: "User State successfully created",
      data: [],
    };

    try {
      let userStates: string[];

      if (Array.isArray(user_state_name)) userStates = user_state_name;
      else userStates = [user_state_name];

      //Look for any user states that may exists but are logically deleted in the table
      let userStatesAlreadyInTable = await UserState.findAll({
        where: {
          name: userStates,
          isActive: false,
        },
      });

      const namesAlreadyInTable = userStatesAlreadyInTable.map((state) => {
        return state.name;
      });

      //Insert only the states that do not exist in the table
      userStates = userStates.filter(
        (state) => !namesAlreadyInTable.includes(state)
      );

      //Update active status for those user states that exist in the table
      await UserState.update(
        { isActive: true },
        {
          where: {
            name: user_state_name,
          },
        }
      );

      await UserState.bulkCreate(userStates.map((name) => ({ name: name })));

      newUserState = await UserState.findAll({
        where: {
          name: user_state_name,
        },
      });

      response.data = newUserState;
    } catch (err) {
      console.log(err);
      response.message = getErrorMessages(err);
      response.statusCode = STATUS_CODE.conflict;
    }

    res.status(response.statusCode).json(response);
  },
  updateUserState: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;
    const { new_user_state_name } = req.body;

    const response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.created,
      message: "Successfully Updated ",
      data: [],
    };

    let amountOfUpdatedUserStates;
    try {
      amountOfUpdatedUserStates = await UserState.update(
        { name: new_user_state_name },
        {
          where: {
            id: id,
            isActive: true,
          },
        }
      );
      response.message +=
        amountOfUpdatedUserStates[0] +
        " User State" +
        (amountOfUpdatedUserStates[0] > 1 ? "s" : "");
      response.data = amountOfUpdatedUserStates;
    } catch (err) {
      console.log(err);
      response.statusCode = STATUS_CODE.conflict;
      response.message = getErrorMessages(err);
    }

    res.status(response.statusCode).json(response);
  },
  deleteUserState: async (
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
    let deletedUserStates: number[];

    try {
      deletedUserStates = await UserState.update(
        { isActive: false },
        {
          where: {
            id: idToFind,
            isActive: true,
          },
        }
      );
    } catch (err) {
      response.statusCode = STATUS_CODE.internalServerError;
      response.message = "Something went wrong";
    }

    response.message +=
      deletedUserStates[0] +
      " User State" +
      (deletedUserStates[0] != 1 ? "s" : "");
    response.data = deletedUserStates;

    res.status(response.statusCode).json(response);
  },
  getUserState: async (
    req: Request,
    res: Response<ApiResponse<UserState | null>>
  ) => {
    const { id } = req.params;

    const response: ApiResponse<UserState | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved User States",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);
    let userStates: UserState[];

    try {
      userStates = await UserState.findAll({
        where: {
          id: idToFind,
        },
      });
      response.data = userStates;
    } catch (err) {
      response.statusCode = STATUS_CODE.internalServerError;
      response.message = "Something went wrong";
    }

    res.status(response.statusCode).json(response);
  },
  getAllUserStates: async (
    req: Request,
    res: Response<ApiResponse<UserState | null>>
  ) => {
    const response: ApiResponse<UserState | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved All User States",
      data: [],
    };

    let userStates: UserState[];

    try {
      userStates = await UserState.findAll();
      response.data = userStates;
    } catch (err) {
      response.statusCode = STATUS_CODE.internalServerError;
      response.message = "Something went wrong";
    }

    res.status(response.statusCode).json(response);
  },
};
