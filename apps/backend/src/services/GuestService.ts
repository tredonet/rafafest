import { Guest } from "@rafafest/core";
import { Database } from "Database";
import { AbstractService } from "./AbstractService";

export class GuestService extends AbstractService<Guest>{
    constructor(database: Database) {
        super(database, Guest);
    }
}
