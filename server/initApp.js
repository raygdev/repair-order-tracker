const helmet = require('helmet')
const cors = require('cors')
const path = require('path')


const registerRoute = require('./routes/register.js')
const loginRoute = require('./routes/login.js')
const userRoutes = require('./routes/user.js')
const repairOrderRoutes = require('./routes/repairOrderRoutes')
const vehicleRoutes = require("./routes/vehicle.js")
const verify = require("./routes/verify.js")
const origin = process.env.NODE_ENV === 'production' ? 'https://repair-order-tracker.vercel.app' : 'http://localhost:5173'

module.exports = {
    initApp(app, express){
        app.use(express.static(path.join(__dirname, 'build',)))
        app.use(cors({ origin }))
        app.use(helmet())
        app.use(express.urlencoded({extended:false}))
        app.use(express.json())
        app.use(verify)
        app.use(registerRoute)
        app.use(loginRoute)
        app.use(userRoutes)
        app.use(repairOrderRoutes)
        app.use(vehicleRoutes)

    }
}
