import nodemailer from "nodemailer";
import { Friend, Guest } from "@rafafest/core";
import { Application, Request } from "express";
import { GuestService } from "../services";
import { requestWrapper, ResponseBody } from "../utils";
import { AbstractController } from "./AbstractController";
import { Emailer } from "../Emailer";

export class GuestController extends AbstractController<Guest> {
	private emailer: Emailer;
	constructor(
		guestService: GuestService,
		private readonly config: Record<string, any>
	) {
		super(Guest, guestService, config.jwtSecret);
		this.emailer = new Emailer(config);
	}

	registerRoutes(app: Application) {
		app.route(this.endPoint + "/find").get(
			requestWrapper(this.getGuest.bind(this))
		);
		app.route(this.endPoint + "/list").get(
			requestWrapper(this.list.bind(this))
		);
		app.route(this.endPoint + "/update").post(
			requestWrapper(this.updateInvite.bind(this))
		);
		app.route(this.endPoint + "/getfriends").get(
			requestWrapper(this.getFriends.bind(this))
		);
		app.route(this.endPoint + "/updatefriend").post(
			requestWrapper(this.updateFriend.bind(this))
		);
		app.route(this.endPoint + "/deletefriend").post(
			requestWrapper(this.deleteFriend.bind(this))
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

	private inviteFriend = async (guest: Guest, friend: Friend) => {
		const { email, name } = friend;
		const guestExists = await this.service.findOne({ email });
		if (guestExists) throw new Error("guest_already_exists");
		const { id, ...guestData } = guest;
		const newGuest = await this.service.create({
			...guestData,
			name,
			surname: "",
			code: Math.random().toString(36).substring(2),
			email: email || "",
			dietryPreference: [],
			invites: 0,
			yearOfAcquaintance: 2023,
			yearsShared: 0,
			circle: "+1",
		});
		if (email)
			this.emailer.sendInvite(
				newGuest.name,
				newGuest.email,
				newGuest.code,
				guest.name
			);
		return newGuest.id.toString();
	};
	async updateInvite(req: Request): Promise<ResponseBody<Guest>> {
		const { code, name, email, attending } = req.body;
		if (!code || !name || !email || !attending)
			throw new Error("fields_missing");
		const guest = await this.service.findOne({ code });
		if (!guest || guest.name !== name) throw new Error("not_found");
		const { newFriends } = req.body;
		delete req.body.newFriends;
		const newFriendsData = newFriends.filter(
			(friendData) => friendData.name
		);
		if (newFriendsData.length > guest.invites - guest.friends.length)
			throw new Error("no_invites_left");
		const friends = await Promise.all(
			newFriendsData.map((friend: Friend) =>
				this.inviteFriend(guest, friend)
			)
		);
		const entity = {
			...guest,
			...req.body,
			friends: [...guest.friends, ...friends],
		};
		return await this.service.updateOne(guest.id.toString(), entity);
	}

	async getFriends(req: Request): Promise<ResponseBody<Guest[]>> {
		const codeHeader = req.headers["code"];
		if (!codeHeader) throw new Error("forbidden");
		const guest = await this.service.findOne({ code: codeHeader });
		if (!guest) throw new Error("forbidden");
		return await Promise.all(
			guest.friends.map((id) => this.service.findById(id))
		);
	}

	async updateFriend(req: Request): Promise<ResponseBody<null>> {
		const codeHeader = req.headers["code"];
		if (!codeHeader) throw new Error("forbidden");
		const guest = await this.service.findOne({ code: codeHeader });
		if (!guest) throw new Error("forbidden");
		const { id, code, ...friend } = req.body;
		if (!guest.friends.includes(id)) throw new Error("forbidden");
		await this.service.updateOne(id, friend);
		return { status: 201, data: null };
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

	async deleteFriend(req: Request): Promise<ResponseBody<null>> {
		const { code } = req.headers;
		const { id } = req.body;
		const guest = await this.service.findOne({ code });
		if (!guest.friends.map((fr) => fr.toString()).includes(id))
			throw new Error("friend_not_found");
		const friend = await this.service.findById(id);
		if (!friend) throw new Error("friend_not_found");
		if (friend.invites !== 0) throw new Error("can't delete invited guest");
		await this.service.deleteOne(id);
		await this.service.updateOne(guest.id.toString(), {
			friends: guest.friends.filter((friend) => friend != id),
		});
		return { status: 204, data: null };
	}
}
