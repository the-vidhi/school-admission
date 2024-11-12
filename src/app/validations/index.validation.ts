import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import { _VALIDATION_FAILED } from "../../utils/responses";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      _VALIDATION_FAILED(res, null, error.details[0].message);
      return;
    }
    next();
  };
};

export const errorMessage = (data: string, message?: string | null, min?: number | null, max?: number | null) => {
  return {
    "string.base": message ? `${data} ${message}` : `${data} must be a string.`,
    "string.empty": message ? `${data} ${message}` : `${data} can't be blank.`,
    "any.required": message ? `${data} ${message}` : `${data} is required.`,
    "string.alphanum": message ? `${data} ${message}` : `${data} must only contain alpha-numeric characters.`,
    "number.max": message ? `${data} ${message}` : `${data} must be less than or equal to ${max}.`,
    "number.min": message ? `${data} ${message}` : `${data} must be greater than or equal to ${min}.`,
    "number.base": message ? `${data} ${message}` : `${data} must be a number.`,
    "array.min": message ? `${data} ${message}` : `${data} must be more than ${min}`
  };
};

export const paginationObj = {
  page: Joi.string().trim().optional().messages(errorMessage("Query Page")),
  limit: Joi.string().trim().optional().messages(errorMessage("Query Limit"))
};

export const paginateValidator = Joi.object(paginationObj);
