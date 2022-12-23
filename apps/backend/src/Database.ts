
import "reflect-metadata";
import { DataSource, EntitySchema, MixedList, MongoEntityManager, MongoRepository } from "typeorm";

export class Database {
    private database: DataSource;
    public readonly manager: MongoEntityManager;
    constructor(entities: MixedList<string | Function | EntitySchema<any>>, connectionString: string) {
        const uri = new URL(connectionString);
        this.database = new DataSource({
            type: "mongodb",
            host: uri.host,
            username: uri.username,
            password: uri.password,
            synchronize: true,
            logging: false,
            entities: entities,
            migrations: [],
            subscribers: []
        });
        this.manager = this.database.mongoManager;
    }

    async connect() {
        this.database.initialize();
    }

    getRepository<E>(type: new (...args: any[]) => E): MongoRepository<E> {
        return this.database.getMongoRepository(type)
    }
}
