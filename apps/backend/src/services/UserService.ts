import { Database } from "../Database";
import { User } from "../models";
import { AbstractService } from "./AbstractService";

export class UserService extends AbstractService<User>{
    constructor(database: Database) {
        super(database, User);
    }
}
