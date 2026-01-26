import { FormValidator, type Validation } from "../formValidator"

export const loginFormValidations: Validation[] = [
    {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Email cannot be empty"
    },
    {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "A valid email address must be provided"
    },
    {
        field: "password",
        method: "isLength",
        args: [{ min: 8 }],
        validWhen: true,
        message: "Password must be at least 8 characters long"
    },
    {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "A password must be provided"
    }
]

export const loginFormValidator = new FormValidator(loginFormValidations)