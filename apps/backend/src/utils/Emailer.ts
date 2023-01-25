import nodemailer from "nodemailer";
export class Emailer {
	private transporter;
	constructor(private readonly config: Record<string, any>) {
		const transporterConfig = this.config.smtpUser
			? {
					host: this.config.smtpServer,
					port: this.config.smtpPort,
					auth: {
						user: this.config.smtpUser,
						pass: this.config.smtpPass,
					},
			  }
			: {
					port: 25,
					secure: false,
			  };

		this.transporter = nodemailer.createTransport(transporterConfig);
	}
	async sendInvite(name: string, email: string) {
		await this.transporter.sendMail({
			from: '"RAFAFEST" <hello@rafafest.com>', // sender address
			to: email, // list of receivers
			subject: `Hello ${name}✔`, // Subject line
			text: "Hello world?", // plain text body
			html: "<b>Hello world?</b>", // html body
		});
	}
}
