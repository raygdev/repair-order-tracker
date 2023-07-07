export const registerFormValidationInit = [
    {
        field: "email",
        method: "isEmail",
        validWhen: true,
        message: "Email must be a valid email address"
    },
    {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "Email must not be empty"
    },
    {
        field: "firstName",
        method: "isEmpty",
        validWhen: false,
        message: "First name is required"
    },
    {
        field: "firstName",
        method: "isLength",
        args: [{ min: 2, max: 32}],
        validWhen: true,
        message: "First name must be between 2 and 32 characters long"
    },
    {
        field: "firstName",
        method: "isAlpha",
        args: ["en-US"],
        validWhen: true,
        message: "First name must be letters only"
    },
    {
        field: "lastName",
        method: "isEmpty",
        validWhen: false,
        message: "Last name is required"
    },
    {
        field: "lastName",
        method: "isLength",
        args: [{ min: 2, max: 32}],
        validWhen: true,
        message: "Last name must be between 2 and 32 characters long"
    },
    {
        field: "lastName",
        method: "isAlpha",
        validWhen: true,
        args: ["en-US"],
        message: "Last name must be letters only"
    },
    {
        field: "shopName",
        method: "isLength",
        args: [{ min: 0, max: 50 }],
        validWhen: true
    },
    {
        field: "shopName",
        method: "matches",
        args: [/^[a-zA-Z'\s]{0,50}$/],
        validWhen: true,
        message: "No special characters other than \"'\" are allowed"
    }
]