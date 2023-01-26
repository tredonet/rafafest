import { HTTPError } from "../errors";
import { NextFunction, Request, Response } from "express";
import { Logger } from "./Logger";

export function ErrorHandler(logger: Logger) {
	return async (
		error: Error,
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		if (error instanceof HTTPError)
			return res.status(error.code).send(error.message);
		return res.status(500).send("internal_server_error");
	};
}
