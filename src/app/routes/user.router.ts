import { Router } from "express";
import { create } from "../controllers/user.controller";
import { validate } from "../validations/index.validation";
import { userCreate } from "../validations/user.validation";

const router = Router();

/* user create route */
router.post("/", validate(userCreate), create);

export default router;
