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
			requestWrapper(this.updateInvite.bind(this))
		);
		app.route(this.endPoint + "/getfriend/:id").get(
			requestWrapper(this.getFriend.bind(this))
		);
		app.route(this.endPoint + "/getfrienddata/:id").get(
			requestWrapper(this.getFriendData.bind(this))
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

	private sendInviteEmail = (guest: Guest) =>
		console.log(`email send to ${guest.email}`);
	private inviteFriend = async (guest: Guest, friendData: any) => {
		const { email, name } = friendData;
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
		if (email) this.sendInviteEmail(newGuest);
		return newGuest.id.toString();
	};
	async updateInvite(req: Request): Promise<ResponseBody<Guest>> {
		const { code, name, email, attending } = req.body;
		if (!code || !name || !email || !attending)
			throw new Error("fields_missing");
		const guest = await this.service.findOne({ code });
		if (!guest || guest.name !== name) throw new Error("not_found");
		const { friendsData } = req.body;
		delete req.body.friendsData;
		const newFriendsData = friendsData.filter(
			(friendData) => !friendData.id && friendData.name
		);
		if (newFriendsData.length > guest.invites - guest.friends.length)
			throw new Error("no_invites_left");
		const newFriends = await Promise.all(
			newFriendsData.map((friendData) =>
				this.inviteFriend(guest, friendData)
			)
		);
		const entity = {
			...guest,
			...req.body,
			friends: [...guest.friends, ...newFriends],
		};
		return await this.service.updateOne(guest.id.toString(), entity);
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
			id: friend.id,
			name: friend.name,
			email: friend.email,
			mainGuest: Boolean(friend.invites),
		};
	}
	async getFriendData(req: Request): Promise<ResponseBody<Guest>> {
		const { id } = req.params;
		return await this.service.findById(id);
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
