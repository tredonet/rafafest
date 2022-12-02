import express, { Express } from "express";
import { GuestController } from "controllers";
import { Database } from "Database";
import { Guest } from "models";
import { GuestService } from "services";
import { HTTPLogger, Logger } from "utils";
import { ErrorHandler } from "utils/ErrorHandler";

export class Server {
    private server: Express;
    private logger: Logger;
    private database: Database;
    private guestController: GuestController;
    constructor() {
        this.server = express();
        this.logger = new Logger();

        this.server.use(HTTPLogger(this.logger));
        this.server.use(express.json());

        this.database = new Database([Guest]);
        const guestService = new GuestService(this.database);
        this.guestController = new GuestController(guestService);

    }

    start() {
        this.database.connect();
        this.guestController.registerRoutes(this.server);
        this.server.use(ErrorHandler(this.logger));
        this.server.listen(8000);
    }
}
