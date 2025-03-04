import jwt from "jsonwebtoken";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import User from "../models/user.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	const [bearer, token] = authorization.split(" ");
	if (bearer !== "Bearer") {
		throw HttpError(401);
	}
	try {
		const { id } = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(id);
		if (!user || !user.token || user.token !== token) {
			throw HttpError(401);
		}
		req.user = user;
		next();
	} catch {
		throw HttpError(401);
	}
};

export default ctrlWrapper(authenticate);