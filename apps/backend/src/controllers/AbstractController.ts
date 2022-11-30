import { Application, Request } from "express";
import { AbstractService } from "services";
import { requestWrapper, ResponseBody } from "utils";

export abstract class AbstractController<E, S extends AbstractService<E> = AbstractService<E>>{

    protected endPoint: string;

    constructor(type: new (...args: unknown[]) => E, protected readonly service: S) {
        this.endPoint = '/api/' + type.name.toLowerCase();
    }

    registerRoutes(server: Application) {
        this._registerRoutes(server);
    }

    protected _registerRoutes(app: Application) {
        app.route(this.endPoint)
            .get(requestWrapper(this.getEntities.bind(this)))
            .post(requestWrapper(this.createEntity.bind(this)));
        app.route(this.endPoint + '/:id')
            .get(requestWrapper(this.getEntity.bind(this)))
            .post(requestWrapper(this.updateEntity.bind(this)))
            .delete(requestWrapper(this.deleteEntity.bind(this)));
    }

    async getEntities(): Promise<ResponseBody<E[]>> {
        return await this.service.find({});
    }

    async createEntity(req: Request): Promise<ResponseBody<E>> {
        const entity = await this.service.create(req.body);
        return { status: 201, data: entity }
    }

    async getEntity(req: Request): Promise<ResponseBody<E>> {
        const results = await this.service.findById(req.params.id);
        return results;
    }

    async updateEntity(req: Request): Promise<ResponseBody<E>> {
        const result = await this.service.updateOne(req.params.id, req.body);
        return { status: 204, data: result };
    }

    async deleteEntity(req: Request): Promise<ResponseBody<null>> {
        await this.service.deleteOne(req.params.id);
        return { status: 204, data: null };
    }
}
