import { Guest } from "@rafafest/core";
import { Application, Request } from "express";
import { GuestService } from "services";
import { requestWrapper, ResponseBody } from "utils";
import { AbstractController } from "./AbstractController";

export class GuestController extends AbstractController<Guest>{
    constructor(guestService: GuestService, jwtSecret: string) {
        super(Guest, guestService, jwtSecret);
    }

    registerRoutes(app: Application) {
        app.route(this.endPoint+ '/find').get(requestWrapper(this.getGuest.bind(this)));
        this._registerRoutes(app);   
    }

    async getGuest(req: Request): Promise<ResponseBody<Guest>> {
        const { code } = req.query;
        console.log(code);
        if (!code) throw new Error("params_missing");
        const guest = await this.service.findOne({ code });
        if (!guest) throw new Error("not_found");
        return guest;
    }
}
