import { ApiResponse } from "../interfaces";
import ProjectState from "../models/ProjectState";
import { Request, Response } from "express";
import { STATUS_CODE } from "../constants";
import {
  getErrorMessages,
  getArrayFromCSV,
  handleError,
  checkIfNotFound,
} from "../utils";

export const ProjectStateController = {
  createProjectState: async (
    req: Request,
    res: Response<ApiResponse<ProjectState | null>>
  ) => {
    const { project_state_name } = req.body;

    let newProjectState: ProjectState[] | null = null;

    let response: ApiResponse<ProjectState> = {
      statusCode: STATUS_CODE.created,
      message: "Project State successfully created",
      data: [],
    };

    try {
      let projectStates: string[];

      if (Array.isArray(project_state_name)) projectStates = project_state_name;
      else projectStates = [project_state_name];

      //Look for any project states that may exists but are logically deleted in the table
      let projectStatesAlreadyInTable = await ProjectState.findAll({
        where: {
          name: projectStates,
          isActive: false,
        },
      });

      const namesAlreadyInTable = projectStatesAlreadyInTable.map((state) => {
        return state.name;
      });

      //Insert only the states that do not exist in the table
      projectStates = projectStates.filter(
        (state) => !namesAlreadyInTable.includes(state)
      );

      //Update active status for those project states that exist in the table
      await ProjectState.update(
        { isActive: true },
        {
          where: {
            name: project_state_name,
          },
        }
      );

      await ProjectState.bulkCreate(
        projectStates.map((name) => ({ name: name }))
      );

      newProjectState = await ProjectState.findAll({
        where: {
          name: project_state_name,
        },
      });

      response.data = newProjectState;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  updateProjectState: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;
    const { new_project_state_name } = req.body;

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.created,
      message: "Successfully Updated ",
      data: [],
    };

    let amountOfUpdatedProjectStates;
    try {
      amountOfUpdatedProjectStates = await ProjectState.update(
        { name: new_project_state_name },
        {
          where: {
            id: id,
            isActive: true,
          },
        }
      );

      checkIfNotFound(amountOfUpdatedProjectStates);

      response.message +=
        amountOfUpdatedProjectStates[0] +
        " Project State" +
        (amountOfUpdatedProjectStates[0] > 1 ? "s" : "");
      response.data = amountOfUpdatedProjectStates;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  deleteProjectState: async (
    req: Request,
    res: Response<ApiResponse<number | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<number | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Deleted ",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);
    let deletedProjectStates;

    try {
      deletedProjectStates = await ProjectState.update(
        { isActive: false },
        {
          where: {
            id: idToFind,
            isActive: true,
          },
        }
      );

      checkIfNotFound(deletedProjectStates);
    } catch (err) {
      response = handleError(err);
    }

    response.message +=
      deletedProjectStates[0] +
      " ProjectState" +
      (deletedProjectStates[0] != 1 ? "s" : "");
    response.data = deletedProjectStates;

    res.status(response.statusCode).json(response);
  },
  getProjectState: async (
    req: Request,
    res: Response<ApiResponse<ProjectState | null>>
  ) => {
    const { id } = req.params;

    let response: ApiResponse<ProjectState | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved Project States",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);
    let projectStates;

    try {
      projectStates = await ProjectState.findAll({
        where: {
          id: idToFind,
        },
      });

      checkIfNotFound(projectStates);

      response.data = projectStates;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
  getAllProjectStates: async (
    req: Request,
    res: Response<ApiResponse<ProjectState | null>>
  ) => {
    let response: ApiResponse<ProjectState | null> = {
      statusCode: STATUS_CODE.ok,
      message: "Successfully Retrieved All Project States",
      data: [],
    };

    let projectStates;

    try {
      projectStates = await ProjectState.findAll();
      checkIfNotFound(projectStates);
      response.data = projectStates;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.statusCode).json(response);
  },
};
