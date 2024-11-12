import { Request, Response } from "express";

import USERS, { userDocument } from "../models/user.model";

import { _INTERNAL_ERROR, _SUCCESS } from "../../utils/responses";

export const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    console.log("🚀 ~ create ~ body:", body);
    const userDetails = await USERS.create(body);

    return _SUCCESS(res, userDetails, "User personalization saved successfully");
  } catch (error) {
    return _INTERNAL_ERROR(res, error);
  }
};
