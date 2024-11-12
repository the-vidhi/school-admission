import { Response } from "express";
import { RESPONSE_MESSAGES, HTTP_STATUS_CODES } from "./constants";

export const createResponseBody = (success: boolean, message: string, data: Record<string, any> | Array<Record<string, any>> | null = null) => {
  return JSON.stringify({ success, message, data });
};

export const createResponseStatus = (statusCode: number) => {
  return { status: statusCode };
};

export const createResponse = (res: Response, statusCode: number, success: boolean, message?: string, data?: any) => {
  return res.status(statusCode).json({ success, message, data });
};

export const _SUCCESS = (res: Response, data?: any, message?: string) => {
  return createResponse(res, HTTP_STATUS_CODES.SUCCESS, true, message || RESPONSE_MESSAGES.SUCCESS, data);
};

export const _VALIDATION_FAILED = async (res: Response, data?: any, message?: string) => {
  console.error({ message, data });
  return createResponse(res, HTTP_STATUS_CODES.VALIDATION_FAILED, false, message || RESPONSE_MESSAGES.VALIDATION_FAILED, data);
};

export const _INTERNAL_ERROR = async (res: Response, data?: any, message?: string) => {
  console.error({ message, data });
  return createResponse(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, message || RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR, data);
};
