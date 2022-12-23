import { Server } from "./Server";

const config = {
    jwtSecret: process.env.JWT_SECRET || "a-secret-that-should-be-changed",
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING || "mongodb://root:example@localhost:27017"
}

const server = new Server(config);
server.start();
