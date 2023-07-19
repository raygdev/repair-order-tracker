import { FormValidator } from "../formValidator"

export const createFormValidations = [
    {
        field: "ro_number",
        method: "matches",
        args: [/^[0-9]{1,20}$/g],
        validWhen: true,
        message: "The repair order number can only contain numbers"
    },
    {
        field: "ro_number",
        method: "isEmpty",
        validWhen: false,
        message: "The Repair order number cannot be empty"
    },
    {
        field: "vin",
        method: "isEmpty",
        validWhen: false,
        message: "A VIN must be provided"
    },
    {
        field: "vin",
        method: "matches",
        args: [/^[A-NP-Za-np-z0-9]{17}$/g],
        validWhen: true,
        message: "VIN must have only alphanumeric characters with no \"o's\""
    },
    {
        field: "vin",
        method: "isLength",
        args: [{ min: 17, max: 17}],
        validWhen: true,
        message: "VIN must be 17 characters in length"
    },
]

export const createFormValidator = new FormValidator(createFormValidations)