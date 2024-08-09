import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import Role from "../models/Role";
import { checkIfNotFound, getArrayFromCSV, handleError } from "../utils";
import { STATUS_CODE } from "../constants";

export const RoleController = {
  createRole: async (req: Request, res: Response<ApiResponse<Role | null>>) => {
    const { role_name } = req.body;

    let newRole: Role[] | null = null;

    let response: ApiResponse<Role | null> = {
      status_code: STATUS_CODE.created,
      message: "Role Successfully Created",
      data: [],
    };

    try {
      let roles: string[];

      if (Array.isArray(role_name)) roles = role_name;
      else roles = [role_name];

      //Look for any roles that may exists but are logically deleted in the table
      let rolesAlreadyInTable = await Role.findAll({
        where: {
          name: roles,
          isActive: false,
        },
      });

      const namesAlreadyInTable = rolesAlreadyInTable.map((role) => {
        return role.name;
      });

      //Insert only the roles that do not exist in the table
      roles = roles.filter((role) => !namesAlreadyInTable.includes(role));

      //Update active status for those roles that exist in the table
      await Role.update(
        { isActive: true },
        {
          where: {
            name: role_name,
          },
        }
      );

      newRole = await Role.bulkCreate(roles.map((name) => ({ name: name })));

      response.data = newRole;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  updateRole: async (req: Request, res: Response<ApiResponse<number>>) => {
    const { id } = req.params;
    const { new_role_name } = req.body;

    let response: ApiResponse<number | null> = {
      status_code: STATUS_CODE.created,
      message: "Successfully Updated ",
      data: [],
    };

    let updatedRoles: number[];
    try {
      updatedRoles = await Role.update(
        { name: new_role_name },
        {
          where: {
            id: id,
            isActive: true,
          },
        }
      );
      checkIfNotFound(updatedRoles);
      response.message +=
        updatedRoles[0] + " Role" + (updatedRoles[0] > 1 ? "s" : "");
      response.data = updatedRoles;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  deleteRole: async (req: Request, res: Response<ApiResponse<number>>) => {
    const { id } = req.params;

    let response: ApiResponse<number | null> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully Deleted ",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);

    try {
      const deletedRoles = await Role.update(
        { isActive: false },
        {
          where: {
            id: idToFind,
            isActive: true,
          },
        }
      );
      checkIfNotFound(deletedRoles);
      response.message +=
        deletedRoles[0] + " Role" + (deletedRoles[0] != 1 ? "s" : "");
      response.data = deletedRoles;
    } catch (err) {
      response = handleError(err);
    }

    res.status(response.status_code).json(response);
  },
  getRole: async (req: Request, res: Response<ApiResponse<Role>>) => {
    const { id } = req.params;

    const response: ApiResponse<Role | null> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully Retrieved Roles",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);

    const roles = await Role.findAll({
      where: {
        id: idToFind,
      },
    });

    response.data = roles;

    res.status(response.status_code).json(response);
  },
  getAllRoles: async (req: Request, res: Response<ApiResponse<Role>>) => {
    let response: ApiResponse<Role | null> = {
      status_code: STATUS_CODE.ok,
      message: "Successfully Retrieved All Roles",
      data: [],
    };

    try {
      const roles = await Role.findAll();
      checkIfNotFound(roles);
      response.data = roles;
    } catch (err) {
      response = handleError(response);
    }

    res.status(response.status_code).json(response);
  },
};
