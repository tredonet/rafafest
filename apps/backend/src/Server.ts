import express, { Express } from "express";
import { GuestController } from "controllers";
import { Database } from "Database";
import { Guest } from "models";
import { GuestService } from "services";
import { HTTPLogger, Logger } from "utils";
import { ErrorHandler } from "utils";
import { User } from "models";
import { UserService } from "services";
import { AuthService } from "services/Authservice";
import { AuthController } from "controllers/AuthController";

export class Server {
    private server: Express;
    private logger: Logger;
    private database: Database;
    private guestController: GuestController;
    private authController: AuthController;

    constructor({jwtSecret}) {
        this.server = express();
        this.logger = new Logger();

        this.server.use(HTTPLogger(this.logger));
        this.server.use(express.json());

        this.database = new Database([Guest, User]);
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
        this.server.listen(8000);
    }
}
