import { Friend, Guest } from "@rafafest/core";
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
		app.route(this.endPoint + "/list").get(
			requestWrapper(this.list.bind(this))
		);
		app.route(this.endPoint + "/rsvp").post(
			requestWrapper(this.rsvp.bind(this))
		);
		app.route(this.endPoint + "/getfriend/:id").get(
			requestWrapper(this.getFriend.bind(this))
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

	async list(req: Request): Promise<ResponseBody<Partial<Guest>[]>> {
		const codeHeader = req.headers["code"];
		if (!codeHeader) throw new Error("forbidden");
		const guest = await this.service.findOne({ code: codeHeader });
		if (!guest) throw new Error("forbidden");
		const guests = await this.service.find({});
		const list = guests.map((guest) => {
			const res: Record<string, any> = {
				name: guest.name,
				surname: guest.surname,
				circle: guest.circle,
				attending: guest.attending,
			};
			return res;
		});
		return list;
	}

	async rsvp(req: Request): Promise<ResponseBody<null>> {
		const { code, name, email, attending } = req.body;
		if (!code || !name || !email || !attending)
			throw new Error("fields_missing");
		const guest = await this.service.findOne({ code });
		if (!guest || guest.name !== name) throw new Error("not_found");
		const updatedGuest = await this.service.updateOne(
			guest.id.toString(),
			req.body
		);
		if (!updatedGuest) throw new Error("error_updating");
		return null;
	}

	async invite(req: Request): Promise<ResponseBody<Guest>> {
		const { name, circle, yearOfAcquaintance, yearsShared } = req.body;
		if (!name || !circle || !yearOfAcquaintance || !yearsShared)
			throw new Error("fields missing");
		const guest = new Guest();
		guest.name = name;
		guest.surname = req.body.surname || "";
		guest.email = req.body.email || "";
		guest.code = Math.random().toString(36).substring(2);
		guest.attendenceDates = {
			from: "13/04/2023",
			to: "17/04/202",
		};
		guest.attending = undefined;
		guest.activities = [];
		guest.invites = req.body.invites || 0;
		guest.friends = [];
		guest.dietryPreference = [];
		guest.active = true;
		guest.circle = circle;
		guest.yearOfAcquaintance = yearOfAcquaintance;
		guest.yearsShared = yearsShared;
		const entity = await this.service.create(guest);
		return { status: 201, data: entity };
	}

	async getFriend(req: Request): Promise<ResponseBody<Friend>> {
		const { code } = req.headers;
		const { id } = req.params;
		const guest = await this.service.findOne({ code });
		if (!guest.friends.map((fr) => fr.toString()).includes(id))
			throw new Error("friend not found");
		const friend = await this.service.findById(id);
		return {
			name: friend.name,
			email: friend.email,
			mainGuest: Boolean(friend.invites),
		};
	}
}
