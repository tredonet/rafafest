import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";
import { Database } from "Database";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class AbstractService<E>{
    private repository: MongoRepository<E>;
    constructor(database: Database, private readonly type: new (...args: any[]) => E) {
        this.repository = database.getRepository(type);
    }

    async create(entity: E) {
        return this.repository.save(entity);
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

    async updateOne(id: string, entity: Partial<E>) {
        await this.repository.update(id, entity as unknown as QueryDeepPartialEntity<E>);
        return this.findById(id);
    }

    async deleteOne(id: string) {
        return this.repository.delete(id);
    }
}
