import express, { RequestHandler } from 'express'

import { isAuthenticated } from "../controllers/middleware/auth"
import { verifyController } from "../controllers/verify-controller"

const router = express.Router()
/**
 * @route /verify-token
 * 
 * route is used to verify a token only
 * 
 * @method POST
 * 
 * make it to a post endpoint only
 * 
 * @param 
 *   @callback isAuthenticated
 *    calls next route or returns a response. If token is expired/invalid
 * 
 *   @callback verifyController
 *     controller to use when next is called to send a 200 status with a message.
 *     on confirming authentication
 *    
 */

router.route("/verify-token")
//@ts-ignore
       .post(isAuthenticated, verifyController)

export { router as verify }