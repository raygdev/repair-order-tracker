import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404
    constructor() {
        super("Not Found")

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeError() {
        return [{ message: "Not Found"}]
    }
}