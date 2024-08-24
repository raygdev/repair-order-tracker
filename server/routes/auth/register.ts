import  express from "express";
const router = express.Router();

import { userRegitrationController } from "../../controllers/user-registration-controller";

router.post("/api/register/user", userRegitrationController );

export { router as registerRoute };
