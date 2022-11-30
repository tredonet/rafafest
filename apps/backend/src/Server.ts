import express, { Express } from "express";
import { GuestController } from "controllers";
import { Database } from "Database";
import { Guest } from "models";
import { GuestService } from "services";

export class Server {
    private server: Express;
    private database: Database;
    private guestController: GuestController;
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.database = new Database([Guest]);
        const guestService = new GuestService(this.database);
        this.guestController = new GuestController(guestService);
    }

    start() {
        this.database.connect();
        this.guestController.registerRoutes(this.server);
        this.server.listen(8000);
    }
}
