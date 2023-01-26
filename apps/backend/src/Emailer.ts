import nodemailer from "nodemailer";
import mustache from "mustache";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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
	async sendInvite(friend: string, email: string, code: string, guest: string) {
		const template = readFileSync(resolve(__dirname, "../public/templates/email.html"), "utf-8");
		const html = mustache.render(template, {friend, code, guest})
		await this.transporter.sendMail({
			from: '"RAFAFEST" <hello@rafafest.com>', // sender address
			to: email, // list of receivers
			subject: `You've been invited to RAFAFEST!`, // Subject line
			html: html, // html body
		});
	}
}
