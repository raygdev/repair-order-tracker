import { app } from '../initApp'
import mongoose from 'mongoose'
import chalk from 'chalk'
import { config } from 'dotenv'
config()

const log = console.log
const port = process.env.PORT
const uri = process.env.MONGO_URI!




// Quiet mongoose warning
mongoose.set("strictQuery", true)
mongoose.connect(uri)
  .then(() => {
    app.listen(port, () => {
        log(
            chalk.green(
                `${chalk.magentaBright("Successfully connected to the DB\n")}App listening on port %s`
                ),
            chalk.blueBright(port)
            )
            process.exitCode = 0
            return
    })
  })
  .catch(e => {
   // Log error and exit
    log(
    chalk.redBright.bold('Error connecting to DB:\n', chalk.bgRedBright("%s")),
    e.reason || e
    )
    process.exitCode = 1
    return;
  })

process.on("exit", (code) => {
    log(
        chalk.bgBlue.bold(`Process exited with code %s`),
        code
    )
})

export default app