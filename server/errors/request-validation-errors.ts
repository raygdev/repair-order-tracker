import { ValidationError } from "express-validator";
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters')

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        const formattedErrors = this.errors.map(error => {
            return {
                message: error.msg,
                field: (error.type === 'field') && error.path || ''
            }
        })
        return formattedErrors
    }
}