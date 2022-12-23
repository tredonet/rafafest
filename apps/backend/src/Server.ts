import express, { Express } from "express";
import history from "connect-history-api-fallback";
import { GuestController, AuthController } from "./controllers";
import { Database } from "./Database";
import { Guest } from "@rafafest/core";
import { GuestService } from "./services";
import { HTTPLogger, Logger, ErrorHandler } from "./utils";
import { User } from "./models";
import { UserService, AuthService } from "./services";
import { resolve } from "node:path";

export class Server {
	private server: Express;
	private logger: Logger;
	private database: Database;
	private guestController: GuestController;
	private authController: AuthController;

	constructor({ jwtSecret, mongoConnectionString }) {
		this.server = express();
		this.logger = new Logger();

		this.server.use(HTTPLogger(this.logger));
		this.server.use(express.json());

		this.database = new Database([Guest, User], mongoConnectionString);
		const guestService = new GuestService(this.database);
		const userService = new UserService(this.database);
		const authService = new AuthService(userService, jwtSecret);
		this.authController = new AuthController(authService, jwtSecret);
		this.guestController = new GuestController(guestService, jwtSecret);
	}

	start() {
		this.database.connect();
		this.guestController.registerRoutes(this.server);
		this.authController.registerRoutes(this.server);
		this.server.use(ErrorHandler(this.logger));
		this.server.use(history());
		this.server.use(express.static(resolve(__dirname, "../public")));
		this.server.listen(8000);
	}
}
