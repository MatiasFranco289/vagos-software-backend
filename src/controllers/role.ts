import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";
import Role from "../models/Role";
import { and, Op } from "sequelize";

const statusCode = 201;
const statusCodeConflict = 409;

export const RoleController = {
    createRole: async (req: Request, res: Response<ApiResponse<Role|null>>) => {
        const {role_name} = req.body;

        let newRole:Role[]|null = null;

        const response : ApiResponse<Role> = {
            statusCode: statusCode,
            message: "Role Successfully Created",
            data: []
        }

        try{
            //TODO: allow the creation of logically deleted roles

            let roles: Role[];

            if (Array.isArray(role_name))
                roles = role_name;
            else
                roles = [role_name];

            //Look for any roles that may exists but are logically deleted in the table
            const names = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: [
                            role_name.map(name => `${name},`)
                        ]
                    },
                    isActive: false
                }
            });

            //Insert only the roles that do not exist in the table
            roles = roles.filter(item => !names.includes(item));//TODO: AAAAAAAAAAAAAAAAAAA

            console.log(names.map(item => `${item.name}`));

            //Update active status for those roles that exist in the table
            const updatedRoles = await Role.update(
                { isActive: true },
                {
                    where: {
                        name: role_name
                    },
                },
            );

            newRole = await Role.bulkCreate(roles.map(name => ({ name: name })));

            response.data = newRole;
        }
        catch (err) {
            console.log(err);
            if (err.errors[0].type === "unique violation"){
                //TODO: specify which role name already exists
                response.message = "The specified role name already exists"
                response.statusCode = statusCodeConflict;
            }
        }

        res.status(response.statusCode).json(response);
    },
    updateRole: async (req: Request, res: Response<ApiResponse<number>>) => {

        let id = -1;
        let old_role_name = "";
        const {new_role_name} = req.body

        if (req.body.hasOwnProperty("id"))
            id = req.body.id;

        if (req.body.hasOwnProperty("old_role_name"))
            old_role_name = req.body.old_role_name;

        const response : ApiResponse<number|null> = {
            statusCode: statusCode,
            message: "Successfully Updated ",
            data: []
        }

        let updatedRoles;
        try{
            updatedRoles = await Role.update(
                { name: new_role_name },
                {
                    where: {
                    [Op.or]: [
                            {
                                id: id,
                                
                            },
                            {
                                name: old_role_name
                            }
                        ]
                    },
                },
            );
            response.message += updatedRoles[0] + " Role" + (updatedRoles[0] > 1 ? "s" : "") ;
            response.data = updatedRoles;
        }
        catch (err){
            console.log(err);
            if (err.errors[0].type === "unique violation"){
                response.statusCode = statusCodeConflict;
                response.message = "The specified role name already exists, the new role name must be unique"
            }
        }

        res.status(response.statusCode).json(response);
    },
    deleteRole: async (req: Request, res: Response<ApiResponse<number>>) => {
        
        let id = -1;
        let role_name = "";

        if (req.body.hasOwnProperty("id"))
            id = req.body.id;

        if (req.body.hasOwnProperty("role_name"))
            role_name = req.body.role_name;

        const response : ApiResponse<number|null> = {
            statusCode: statusCode,
            message: "Successfully Deleted ",
            data: []
        }

        const deletedRoles = await Role.update(
            { isActive: false },
            {
                where: {
                [Op.or]: [
                        {
                            id: id,
                            
                        },
                        {
                            name: role_name
                        }
                    ],
                    isActive: true
                },
            },
        );

        response.message += deletedRoles[0] + " Role" + (deletedRoles[0] != 1 ? "s" : "");
        response.data = deletedRoles;

        res.status(response.statusCode).json(response);
    },
    getRole: async (req: Request, res: Response<ApiResponse<Role>>) => {

        let id = -1;
        let role_name = "";

        if (req.body.hasOwnProperty("id"))
            id = req.body.id;

        if (req.body.hasOwnProperty("role_name"))
            role_name = req.body.role_name;

        const response : ApiResponse<Role|null> = {
            statusCode: statusCode,
            message: "Successfully Retrieved Roles",
            data: []
        }

        const roles = await Role.findAll(
            {
                where: {
                [Op.or]: [
                        {
                            id: id,
                            
                        },
                        {
                            name: role_name
                        }
                    ],
                },
            },
        );

        response.data = roles;

        res.status(response.statusCode).json(response);
    },
    getAllRoles: async (req: Request, res: Response<ApiResponse<Role>>) => {

        const response : ApiResponse<Role|null> = {
            statusCode: statusCode,
            message: "Successfully Retrieved All Roles",
            data: []
        }

        const roles = await Role.findAll();

        response.data = roles;

        res.status(response.statusCode).json(response);
    }
};