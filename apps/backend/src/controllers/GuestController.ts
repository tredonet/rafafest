import { Guest } from "models";
import { GuestService } from "services";
import { AbstractController } from "./AbstractController";

export class GuestController extends AbstractController<Guest>{
    constructor(guestService: GuestService, jwtSecret: string){
        super(Guest, guestService, jwtSecret);
    }
}
