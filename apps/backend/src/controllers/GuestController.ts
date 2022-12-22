import { Guest } from "@rafafest/core";
import { Application, Request } from "express";
import { GuestService } from "services";
import { requestWrapper, ResponseBody } from "utils";
import { AbstractController } from "./AbstractController";

export class GuestController extends AbstractController<Guest> {
	constructor(guestService: GuestService, jwtSecret: string) {
		super(Guest, guestService, jwtSecret);
	}

	registerRoutes(app: Application) {
		app.route(this.endPoint + "/find").get(
			requestWrapper(this.getGuest.bind(this))
		);
		app.route(this.endPoint + "/rsvp").post(
			requestWrapper(this.rsvp.bind(this))
		);
		this._registerRoutes(app);
	}

	async getGuest(req: Request): Promise<ResponseBody<Guest>> {
		const { code } = req.query;
		if (!code) throw new Error("params_missing");
		const guest = await this.service.findOne({ code });
		if (!guest) throw new Error("not_found");
		return guest;
	}

	async rsvp(req: Request): Promise<ResponseBody<null>> {
		const { code, name, surname, email, attending } = req.body;
		if (!code || !name || !surname || !email || !attending)
			throw new Error("fields_missing");
		const guest = await this.service.findOne({ code });
		if (!guest || guest.name !== name) throw new Error("not_found");
		guest.surname = surname;
		guest.email = surname;
		guest.attending = attending;
		const updatedGuest = await this.service.updateOne(guest.id.toString(), {
			surname,
			email,
			attending,
		});
		if (!updatedGuest) throw new Error("error_updating");
		return null;
	}
}
