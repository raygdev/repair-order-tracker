export const createFormValidations = [
    {
        field: "ro_number",
        method: "isEmpty",
        validWhen: false,
        message: "The Repair order number cannot be empty"
    },
    {
        field: "ro_number",
        method: "match",
        args: [/^[A-Za-z0-9]{1,20}$/g],
        validWhen: true,
        message: "The repair order number can only contain letters and numbers"
    },
    {
        field: "vin",
        method: "isEmpty",
        validWhen: false,
        message: "A VIN must be provided"
    },
    {
        field: "vin",
        method: "isLength",
        args: [{ min: 17, max: 17}],
        message: "VIN must be 17 characters in length"
    },
    {
        field: "vin",
        method: "match",
        args: [/^[A-NP-Za-np-z0-9]{17}$/g],
        validWhen: true,
        message: "VIN must have only alphanumeric characters with no \"o's\""
    }
]