import { Request, Response, NextFunction } from "express";

export function WrapRoute(status: number = 200) {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const fn = descriptor.value;
        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            console.log(key)
            try {
                const result = await fn.apply(target, req, res);
                if(!result) return res.status(status).send();
                return res.status(status).json(result);
            } catch (e) {
                console.log(e)
                next(e);
            }
        }

        return descriptor;
    }
}
