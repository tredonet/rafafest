import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { Database } from "../Database";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export class AbstractService<E>{
    private repository: MongoRepository<E>;
    constructor(database: Database, private readonly type: new (...args: any[]) => E) {
        this.repository = database.getRepository(type);
    }

    async create(entity: E) {
		const instance = plainToInstance(this.type, entity);
		await validateOrReject(instance as unknown as object);
        return this.repository.save(instance);
    }

    async findById(id: string) {
        const _id = new ObjectId(id);
        return this.repository.findOneBy({ _id })
    }

    async find(query: Record<string, any>) {
        return this.repository.find(query);
    }

    async findOne(query: Record<string, any>) {
        return this.repository.findOne(query)
    }

    async updateOne(id: string, partialEntity: Partial<E>) {
        const entity = await this.findById(id);
        const instance =  {...entity, ...partialEntity};
        await validateOrReject(instance);
        await this.repository.update(id, instance as unknown as QueryDeepPartialEntity<E>);
        return instance;
    }

    async deleteOne(id: string) {
        return this.repository.delete(id);
    }
}
