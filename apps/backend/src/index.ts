import { Server } from "./Server";

const config = {
    jwtSecret: 'a-secret-that-should-be-changed'
}

const server = new Server(config);
server.start();
