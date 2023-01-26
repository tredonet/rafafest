export class HTTPError extends Error{
    public readonly message: string;
    public code: number;
    constructor(message: string){
        super(message);
        this.message = message;
        Object.setPrototypeOf(this, HTTPError.prototype);
    }
}

export class BadRequestError extends HTTPError {
	constructor(message: string = "bad_request") {
        super(message);
		this.code = 400;
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}

export class NotAuthenticatedError extends HTTPError {
	constructor(message: string = "unauthenticated") {
        super(message);
		this.code = 401;
		Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
	}
}

export class NotAuthorizedError extends HTTPError {
	constructor(message: string = "forbidden") {
        super(message);
		this.code = 403;
		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}
}

export class NotFoundError extends HTTPError {
	constructor(message: string = "not_found") {
        super(message);
		this.code = 404;
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}
