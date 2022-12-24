import { Guest } from "@rafafest/core";
import { Application, Request } from "express";
import { GuestService } from "../services";
import { requestWrapper, ResponseBody } from "../utils";
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
		app.route(this.endPoint + "/invite").post(
			this.auth,
			requestWrapper(this.invite.bind(this))
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
		if (!code || !name || !email || !attending)
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

	async invite(req: Request): Promise<ResponseBody<Guest>> {
		const { name, circle, yearOfAcquaintance } = req.body;
		if (!name || !circle || !yearOfAcquaintance)
			throw new Error("fields missing");
		const guest = new Guest();
		guest.name = name;
		guest.surname = req.body.surname;
		guest.email = req.body.email;
		guest.code = Math.random().toString(36).substring(2);
		guest.attendenceDates = [];
		guest.attending = undefined;
		guest.activities = [];
		guest.invites = req.body.invites || 0;
		guest.friends = [];
		guest.dietryPreference = [];
		guest.active = true;
		guest.circle = circle;
		guest.yearOfAcquaintance = yearOfAcquaintance;
		guest.placeOfAcquaintance = 0;
		const entity = await this.service.create(guest);
		return { status: 201, data: entity };
	}
}
