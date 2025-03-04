import express from "express";
import authController from "../../controllers/auth-controller.js";
import usersSchemas from "../../schemas/user-schema.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, upload } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
	"/users/register",
	validateBody(usersSchemas.userRegisterSchema),
	authController.register,
);
authRouter.get("/users/verify/:verificationToken", authController.verifyEmail);

authRouter.post(
	"/users/verify",
	validateBody(usersSchemas.userEmailSchema),
	authController.resendVerifyEmail,
);

authRouter.post(
	"/users/login",
	validateBody(usersSchemas.userLoginSchema),
	authController.login,
);
authRouter.patch(
	"/users/avatars",
	authenticate,
	upload.single("avatar"),
	authController.updateAvatar,
);
authRouter.get("/users/current", authenticate, authController.getCurrent);

authRouter.post("/users/logout", authenticate, authController.logout);
export default authRouter;