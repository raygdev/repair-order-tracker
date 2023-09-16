const epxress = require("express")
const router = epxress.Router()

const { isAuthenticated } = require("../controllers/middleware/authMiddleware")
const verify = require("../controllers/verifyController")

/**
 * This is a workaround for loaders in client. RR seems to want 
 * cookies or sessions used. I'd like to follow with jwt and keep the
 * server as stateless as possible. Hacky for sure... this endpoint may get
 * bombarded considering that each RR loader runs concurrently. Wonder what 
 * kind of bottleneck could happend?
 */


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
 *   @callback verify.verifyController
 *     controller to use when next is called to send a 200 status with a message.
 *     on confirming authentication
 *    
 */
router.route("/verify-token")
       .post(isAuthenticated, verify.verifyController)

module.exports = router