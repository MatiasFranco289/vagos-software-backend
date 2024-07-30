import { validationResult } from 'express-validator';
import { ApiResponse } from './../interfaces';

const statusCode = 400;

export const validateResult = (req, res, next) => { 
    try { 
        validationResult(req).throw();
        return next();
    }
    catch (error) {
        const response : ApiResponse<null> = { 
            statusCode: statusCode, 
            message: 'Bad Request',
            data: error.array()
        }
        res.status(statusCode).json(response);
    }
}
