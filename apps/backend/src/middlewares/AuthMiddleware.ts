import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


export const auth = (secret: string) => async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).send("forbidden");
    const [bearer, token] = authHeader.split(' ');
    try {
        jwt.verify(token, secret);
    } catch (e) { next(e); }
    next();
}

