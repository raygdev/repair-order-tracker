import express from "express"

import { updateJobRouter } from "./update";
import { deleteJobRouter } from "./delete";
import { createJobRouter } from "./new";

const router = express.Router()

router.use(updateJobRouter)
router.use(deleteJobRouter)
router.use(createJobRouter)

export { router as jobsRoutes }