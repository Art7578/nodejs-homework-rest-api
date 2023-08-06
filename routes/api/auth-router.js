import express from "express";
import authController from "../../controllers/auth-controller.js";
import userSchema from "../../schemas/user-schema.js";
import {validateBody} from "../../decorators/index.js";
import {authenticate} from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
    "/users/register",
    validateBody(userSchema.userRegisterSchema),
    authController.register,
);

authRouter.post(
    "/users/login",
    validateBody(userSchema.userLoginSchema),
    authController.login,
);

authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.post("/users/logout", authenticate, authController.logout);

export default authRouter;