

export class ApiError extends Error{
    constructor(statusCode, messagge) {
        super(messagge);
        this.statusCode = statusCode;
    }
}