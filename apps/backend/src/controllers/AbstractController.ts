import { Application, Request, RequestHandler } from "express";
import { auth as _auth } from "../middlewares";
import { AbstractService } from "../services";
import { requestWrapper, ResponseBody } from "../utils";

export abstract class AbstractController<E,	S extends AbstractService<E> = AbstractService<E>> {
	protected endPoint: string;
	protected auth: RequestHandler;

	constructor(
		private readonly type: new (...args: unknown[]) => E,
		protected readonly service: S,
		jwtSecret: string
	) {
		this.endPoint = "/api/" + type.name.toLowerCase();
		this.auth = _auth(jwtSecret);
	}

	registerRoutes(server: Application) {
		this._registerRoutes(server);
	}

	protected _registerRoutes(app: Application) {
		app.route(this.endPoint)
			.get(this.auth, requestWrapper(this.getEntities.bind(this)))
			.post(this.auth, requestWrapper(this.createEntity.bind(this)));
		app.route(this.endPoint + "/:id")
			.get(this.auth, requestWrapper(this.getEntity.bind(this)))
			.post(this.auth, requestWrapper(this.updateEntity.bind(this)))
			.delete(this.auth, requestWrapper(this.deleteEntity.bind(this)));
	}

	protected async getEntities(): Promise<ResponseBody<E[]>> {
		return await this.service.find({});
	}

	protected async createEntity(req: Request): Promise<ResponseBody<E>> {
		const entity = await this.service.create(req.body);
		return { status: 201, data: entity };
	}

	protected async getEntity(req: Request): Promise<ResponseBody<E>> {
		const results = await this.service.findById(req.params.id);
		return results;
	}

	protected async updateEntity(req: Request): Promise<ResponseBody<E>> {
		const result = await this.service.updateOne(req.params.id, req.body);
		return { status: 204, data: result };
	}

	protected async deleteEntity(req: Request): Promise<ResponseBody<null>> {
		await this.service.deleteOne(req.params.id);
		return { status: 204, data: null };
	}
}
