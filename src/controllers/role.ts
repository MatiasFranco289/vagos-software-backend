import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import Role from "../models/Role";
import { getArrayFromCSV } from "../utils";
import { statusCode } from "../constants";

export const RoleController = {
  createRole: async (req: Request, res: Response<ApiResponse<Role | null>>) => {
    const { role_name } = req.body;

    let newRole: Role[] | null = null;

    const response: ApiResponse<Role> = {
      statusCode: statusCode.created,
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
      console.log(err);
      if (err.errors[0].type === "unique violation") {
        //Iterate over the errors and show them in the response
        let message: string = "";
        err.errors.forEach((element) => {
          message += element.message + ": " + element.value;
        });

        response.message = message;
        response.statusCode = statusCode.conflict;
      }
    }

    res.status(response.statusCode).json(response);
  },
  updateRole: async (req: Request, res: Response<ApiResponse<number>>) => {
    const { id } = req.params;
    const { new_role_name } = req.body;

    const response: ApiResponse<number | null> = {
      statusCode: statusCode.created,
      message: "Successfully Updated ",
      data: [],
    };

    let updatedRoles;
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
      response.message +=
        updatedRoles[0] + " Role" + (updatedRoles[0] > 1 ? "s" : "");
      response.data = updatedRoles;
    } catch (err) {
      console.log(err);
      if (err.errors[0].type === "unique violation") {
        response.statusCode = statusCode.conflict;
        response.message =
          "The specified role name already exists, the new role name must be unique";
      }
    }

    res.status(response.statusCode).json(response);
  },
  deleteRole: async (req: Request, res: Response<ApiResponse<number>>) => {
    const { id } = req.params;

    const response: ApiResponse<number | null> = {
      statusCode: statusCode.ok,
      message: "Successfully Deleted ",
      data: [],
    };

    let idToFind: Array<string> = getArrayFromCSV(id);

    const deletedRoles = await Role.update(
      { isActive: false },
      {
        where: {
          id: idToFind,
          isActive: true,
        },
      }
    );

    response.message +=
      deletedRoles[0] + " Role" + (deletedRoles[0] != 1 ? "s" : "");
    response.data = deletedRoles;

    res.status(response.statusCode).json(response);
  },
  getRole: async (req: Request, res: Response<ApiResponse<Role>>) => {
    const { id } = req.params;

    const response: ApiResponse<Role | null> = {
      statusCode: statusCode.ok,
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

    res.status(response.statusCode).json(response);
  },
  getAllRoles: async (req: Request, res: Response<ApiResponse<Role>>) => {
    const response: ApiResponse<Role | null> = {
      statusCode: statusCode.ok,
      message: "Successfully Retrieved All Roles",
      data: [],
    };

    const roles = await Role.findAll();

    response.data = roles;

    res.status(response.statusCode).json(response);
  },
};
