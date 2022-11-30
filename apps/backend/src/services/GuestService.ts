import { Database } from "Database";
import { Guest } from "models";
import { AbstractService } from "./AbstractService";

export class GuestService extends AbstractService<Guest>{
    constructor(database: Database) {
        super(database, Guest);
    }
}
