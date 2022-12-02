import { NextFunction, Request, Response } from "express";
import { finished } from "node:stream";
import chalk from "chalk";
import { Logger } from "utils";

export function HTTPLogger(logger: Logger) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const start = new Date().getTime();

        finished(res, () => {
            const status =
                res.statusCode >= 400 ? chalk.red(res.statusCode) :
                res.statusCode >= 300 ? chalk.yellow(res.statusCode) :
                res.statusCode.toString();

            logger.http('%s %s %s - %d ms',
                req.method,
                chalk.underline(req.path),
                status,
                new Date().getTime() - start);
        });

        next();
    }
}
