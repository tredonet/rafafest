import { NextFunction, Request, Response } from "express";

export type ResponseBody<T> = T | {
    status: number;
    data: T;
}

export function requestWrapper<T>(fn: (req: Request, res: Response) => Promise<ResponseBody<T>>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await fn(req, res);
            if (result && 'status' in result && 'data' in result) {
                if (result.data === null) return res.status(result.status).send();
                return res.status(result.status).json(result.data);
            }
            else
                return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }
}
