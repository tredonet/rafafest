import { Application, Request, RequestHandler } from "express";
import { auth as _auth } from "middlewares";
import { AuthService } from "services/Authservice";
import { ObjectID } from "typeorm";
import { requestWrapper, ResponseBody } from "utils";

type ReturnUser = {
    id?: ObjectID
    username: string
}

export class AuthController {
    private endpoint = "/api/auth/";
    private auth: RequestHandler;

    constructor(private authService: AuthService, jwtSecret: string) {
        this.auth = _auth(jwtSecret);
    }

    registerRoutes(app: Application) {
        app.route(this.endpoint + "login").post(requestWrapper(this.login.bind(this)))
        app.route(this.endpoint + "register").post(requestWrapper(this.register.bind(this)))
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
}
