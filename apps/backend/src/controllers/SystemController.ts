import { Database } from "Database";
import { Application } from "express";
import { requestWrapper } from "../utils";

export class SystemController {
	private endpoint = "/api/ping/";

	constructor(private readonly database: Database) {}

	registerRoutes(app: Application) {
		app.route(this.endpoint).get(requestWrapper(this.ping.bind(this)));
	}
	private async ping(): Promise<{ status: string }> {
		const status = this.database.isConnected() ? "up" : "down";
		return { status };
	}
}
