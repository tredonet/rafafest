import { Guest } from "models";
import { GuestService } from "services";
import { AbstractController } from "./AbstractController";

export class GuestController extends AbstractController<Guest>{
    constructor(guestService: GuestService){
        super(Guest, guestService);
    }
}
