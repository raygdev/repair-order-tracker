import { Response } from 'express'

export function handleRegistrationError(res: Response, err:any){
    const errors = { message: ''};
    if (err.name === "MongoServerError") {
      return res.status(401).send({ error: "User Already Exists" });
    } else if (err.name === "ValidationError") {
      Object.keys(err.errors).forEach((key) => {
        errors["message"] = err.errors[key].properties.message;
      });
      return res.status(404).send({ error: errors.message });
    } else {
      return res.status(404).send({ error: err.message });
    }
}
