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
		await validateOrReject(instance as unknown as object, {
			whitelist: true,
			forbidNonWhitelisted: true,
		});
		return this.repository.save(instance);
	}

	async findById(id: string) {
		const _id = new ObjectId(id);
		return this.repository.findOneBy({ _id });
	}

	async find(query: Record<string, any>) {
		return this.repository.find(query);
	}

	async findOne(query: Record<string, any>) {
		return this.repository.findOne(query);
	}

	async updateOne(_id: string, partialEntity: Partial<E>) {
		const result = await this.findById(_id);
        //@ts-ignore id doest exist
		const { id, ...entity } = result;
		const instance = plainToInstance(this.type, {
			...entity,
			...partialEntity,
		});
		await validateOrReject(instance as unknown as object, {
			whitelist: true,
			forbidNonWhitelisted: true,
		});
		await this.repository.update(
			_id,
			instance as unknown as QueryDeepPartialEntity<E>
		);
		return instance;
	}

	async deleteOne(id: string) {
		return this.repository.delete(id);
	}
}
