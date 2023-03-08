import { BadRequestError } from "errors";
import { Application, Request, RequestHandler } from "express";
import { ObjectID } from "typeorm";
import { auth as _auth } from "../middlewares";
import { AuthService } from "../services";
import { requestWrapper, ResponseBody } from "../utils";

type ReturnUser = {
	id?: ObjectID;
	username: string;
};

export class AuthController {
	private endpoint = "/api/auth/";
	private auth: RequestHandler;

	constructor(private authService: AuthService, jwtSecret: string) {
		this.auth = _auth(jwtSecret);
	}

	registerRoutes(app: Application) {
		app.route(this.endpoint + "login").post(
			requestWrapper(this.login.bind(this))
		);
		app.route(this.endpoint + "register").post(
			this.auth,
			requestWrapper(this.register.bind(this))
		);
		app.route(this.endpoint + "change-password").post(
			this.auth,
			requestWrapper(this.changePassword.bind(this))
		);
	}

	private async login(req: Request): Promise<{ token: string }> {
		const { username, password } = req.body;
		const token = await this.authService.login(username, password);
		return { token };
	}

	private async register(req: Request): Promise<ResponseBody<ReturnUser>> {
		const { username, password } = req.body;
		return await this.authService.register(username, password);
	}

	private async changePassword(req: Request): Promise<ResponseBody<null>> {
		const { username, password, newPassword, newPasswordConfirm } =
			req.body;
		if (!username || !password || !newPassword || !newPasswordConfirm)
			throw new BadRequestError("fields missing");
		if (newPassword !== newPasswordConfirm)
			throw new BadRequestError("password don't match");
		await this.authService.changePassword(username, password, newPassword);
		return { status: 201, data: null };
	}
}
