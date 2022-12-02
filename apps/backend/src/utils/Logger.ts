import chalk from "chalk";
import { format } from "util";
import { Writable } from "stream";

export class Logger {

    constructor(
        private readonly stdout: Writable = process.stdout,
        private readonly stderr: Writable = process.stderr
    ) { }

    http(msg: string, ...args: any[]): void {
        this.log(chalk.magenta('http'), this.stdout)(msg, ...args);
    }
    debug(msg: string, ...args: any[]): void {
        this.log(chalk.blue('debug'), this.stdout)(msg, ...args);
    }
    info(msg: string, ...args: any[]): void {
        this.log(chalk.green('info'), this.stdout)(msg, ...args);
    }
    warn(msg: string, ...args: any[]): void {
        this.log(chalk.yellow('warn'), this.stdout)(msg, ...args);
    }
    error(msgOrError: string | Error, ...args: any[]): void {
        if (typeof msgOrError === 'string') this.log(chalk.red('error'), this.stderr)(msgOrError, ...args);
        else this.log(chalk.red('error'), this.stderr)('%s: %s', chalk.underline(msgOrError.constructor.name), msgOrError.message);
    }

    private log(level: string, stream: Writable) {
        const _timestamp = new Date().toISOString();
        const _level = chalk.level > 0 ? level.padEnd(15) : level.padEnd(6);
        return (msg: string, ...args: string[]) => stream.write(`${chalk.gray(_timestamp)} ${_level} ${format(msg, ...args)}\n`);
    }
}
