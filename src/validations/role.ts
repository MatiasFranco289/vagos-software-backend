import { check, oneOf } from "express-validator"
import { validateResult } from "../middlewares/validateMiddleware";

export const roleCreateValidation = [ 
    check("role_name")
    .exists()
    .custom(value => {
        if (typeof value === 'string' && value.trim() !== '') {
            return true;
        }
        if (Array.isArray(value) && value.every(item => typeof item === 'string' && item.trim() !== '')) {
            return true;
        }
        throw new Error("role_name must be a non-empty string or an array of non-empty strings");
    }),
    (req, res, next) => { 
        validateResult(req,res, next);
     }
    ];

export const roleUpdateValidation = [ 
    oneOf([
        check('old_role_name')
            .exists().withMessage('old_role_name must be provided')
            .isString().withMessage('old_role_name must be a string')
            .notEmpty().withMessage('old_role_name cannot be empty'),
        check('id')
            .exists().withMessage('id must be provided')
            .isNumeric().withMessage('id must be a string')
            .notEmpty().withMessage('id cannot be empty')
            //TODO: Check if id isn't an array, it must be one single integer
    ], { message: 'Either old_role_name or id must be provided' }),
    check('new_role_name')
        .exists().withMessage('new_role_name must be provided')
        .isString().withMessage('new_role_name must be a string')
        .notEmpty().withMessage('new_role_name cannot be empty'),
    (req, res, next) => { 
        //Note: maybe add some code here so that the error message is easier to read
        validateResult(req,res, next);
     }
 ];

 export const roleDeleteValidation = [ 
    oneOf([
        check('role_name')
            .exists().withMessage('role_name must be provided')
            .notEmpty().withMessage('role_name cannot be empty')
            .custom(value => {
                if (typeof value === 'string' && value.trim() !== '') {
                    return true;
                }
                if (Array.isArray(value) && value.every(item => typeof item === 'string' && item.trim() !== '')) {
                    return true;
                }
                throw new Error("role_name must be a non-empty string or an array of non-empty strings");
            }),
        check('id')
            .exists().withMessage('id must be provided')
            .isNumeric().withMessage('id must be a string')
            .notEmpty().withMessage('id cannot be empty')
    ], { message: 'Either role_name or id must be provided' }),
    (req, res, next) => { 
        validateResult(req,res, next);
     }
 ];

 //This works, but there's no easy way to get all the roles
 export const roleGetValidation = roleDeleteValidation;