import { Server } from "./Server";

const config = {
	jwtSecret: process.env.JWT_SECRET || "a-secret-that-should-be-changed",
	mongoConnectionString:
		process.env.MONGO_CONNECTION_STRING ||
		"mongodb://root:example@localhost:27017",
	smtpPort: process.env.SMTP_PORT,
	smtpServer: process.env.SMTP_SERVER,
	smtpUser: process.env.SMTP_USER,
	smtpPass: process.env.SMTP_PASS,
};

const server = new Server(config);
server.start();
